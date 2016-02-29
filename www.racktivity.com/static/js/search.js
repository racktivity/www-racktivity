var lunrIndex,
    pagesIndex,
    
    $results,
    $pager,

    currentQuery,
    currentPageIndex,
    results,
    pageSize = 10;

// Initialize lunrjs using our generated index file
function initLunr() {
    // First retrieve the index file
    $.getJSON("/js/lunr/PagesIndex.json")
        .done(function(index) {
            pagesIndex = index;
            //console.log("index:", pagesIndex);

            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            lunrIndex = lunr(function() {
                this.field("title", {
                    boost: 10
                });
                this.field("tags", {
                    boost: 5
                });
                this.field("content", {
                    boost: 1
                });

                // ref is the result item identifier (I chose the page URL)
                this.ref("href");
            });

            // Feed lunr with each file and let lunr actually index them
            pagesIndex.forEach(function(page) {
                lunrIndex.add(page);
            });
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index flie:", err);
        });
}

// Nothing crazy here, just hook up a listener on the input field
function initUI() {
    $results = $("#results");
    $pager = $('.pager');

    $("#search").keyup(function() {
        $results.empty();
        $pager.empty();

        // Only trigger a search when 2 chars. at least have been provided
        currentQuery = $(this).val();
        if (currentQuery.length < 2) {
            return;
        }

        results = search(currentQuery);
        console.log(results);
        goToPageIndex(0);
    });
}

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    // Find the item in our index corresponding to the lunr one to have more info
    // Lunr result: 
    //  {ref: "/section/page1", score: 0.2725657778206127}
    // Our result:
    //  {title:"Page1", href:"/section/page1", ...}

    
    var allResults = lunrIndex.search(query).map(function(result) {
            return pagesIndex.filter(function(page) {
                return page.href === result.ref;
            })[0];
        });

    /* IMPORTANT
    * for some reason, test case 'going' was failing
    * it returns results without real match
    * as a quick workaround, we will check here if there's a match
    * in content, title, or url
    */
    var filteredResults = [],
        queryParts = query.trim().toLowerCase().split(' ');

    // go through results
    allResults.forEach(function(result) {
        var match = false,
            contentLowerCase = result.content.toLowerCase(),
            titleLowerCase = result.content.toLowerCase();

        // go through all query parts
        queryParts.forEach(function(queryPart) {
            if (contentLowerCase.indexOf(queryPart) !== -1 ||
                titleLowerCase.indexOf(queryPart) !== -1) {
                match = true;
            }
        });

        if (match === true) {
            filteredResults.push(result);
        }
    });

    return filteredResults;
}

function unify(arr) {
    var res = [];

    for (var i=0; i<arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i]);
        }
    }

    return res;
}

function getSummary(result) {
    var matchBefore = 50,
        matchAfter = 100,
        summary = '',
        content = result.content,
        caseFreeContent = content.toLowerCase(),
        queryParts = currentQuery.trim().toLowerCase().split(' '),
        queryParts = unify(queryParts);

    for (var i=0; i<queryParts.length; i++) {
        var query = queryParts[i],
            matchIndex = caseFreeContent.indexOf(query),
            originalMatch = content.substr(matchIndex, query.length),
            querySummary = '';

        if (matchIndex === -1) { // if match is only in page title
            continue;
        }

        var index = matchIndex - 1;
        while (index >= 0 && (matchIndex - index < matchBefore || content[index] != ' ')) { // get max 50 char before match
            querySummary = content[index] + querySummary;
            index--;
        }

        index = matchIndex;
        while (index < content.length && index - matchIndex < matchAfter ) { // match 100 char after
            querySummary = querySummary + content[index];
            index++;
        }

        if (i !== 0 && summary.length !== 0) {
            summary += '<br>_<br>';
        }

        summary += querySummary.replace(new RegExp(query, 'ig'), '<strong>' + originalMatch + '</strong>') + '...';
    }
    
    
    return summary;
}

// this to highlight matches in title
function getTitle(result) {
    var title = result.title,
        caseFreeTitle = title.toLowerCase(),
        queryParts = currentQuery.trim().toLowerCase().split(' '),
        queryParts = unify(queryParts);

    for (var i=0; i<queryParts.length; i++) {
        var query = queryParts[i],
            caseFreeTitle = title.toLowerCase(),
            matchIndex = caseFreeTitle.indexOf(query),
            originalMatch = title.substr(matchIndex, query.length);

        title = title.replace(new RegExp(query, 'ig'), '<strong>' + originalMatch + '</strong>');
    }

    return title;
}

function goToPageIndex(pageIndex) {
    if (pageIndex === 'prev') {
        pageIndex = currentPageIndex - 1;
    }

    if (pageIndex === 'next') {
        pageIndex = currentPageIndex + 1;
    }

    currentPageIndex = pageIndex;
    renderResults(pageIndex);
    renderPager(pageIndex);
    scrollTop();
}

function scrollTop() {
    var body = $("html, body");
    body.stop().animate({scrollTop: 0}, '100', 'swing');
}

/**
 * Display the 10 first results
 * @param  {Array} results to display
 */
function renderResults(pageIndex) {
    $results.empty();

    if (!results.length) {
        return;
    }

    var remains = results.length % pageSize > 0 ? 1 : 0,
        pagesCount = parseInt(results.length / pageSize, 10) + remains,
        startIndex = pageIndex * pageSize,
        endIndex = startIndex + pageSize;

    endIndex >= results.length ? endIndex = results.length - 1 : null; // handle last page

    results.slice(startIndex, endIndex).forEach(function(result) {
        var $result = $('<li class="result">');
        
        var $anchor = $('<a>', {
            href: result.href,
            class: 'title lead clearfix'
        });

        $anchor.html(getTitle(result));

        $result.append($anchor);

        $result.append($('<span class="url"></span>').text(result.href));

        var resSummary = getSummary(result);
        $result.append($('<p class="summary"></p>').html(resSummary));

        $results.append($result);
    });
}

function renderPager(pageIndex) {
    $pager.empty();

    var remains = results.length % pageSize > 0 ? 1 : 0,
        pagesCount = parseInt(results.length / pageSize, 10) + remains,
        startIndex = pageIndex * pageSize,
        endIndex = startIndex + pageSize;

    if (pagesCount < 2) { // don't show pager if it's only one page
        return;
    }

    var $prevButton = $('<li>', {
        text: '<',
        class: 'page' + (pageIndex === 0 ? ' disabled' : ''),
        onclick: (pageIndex === 0 ? '' : 'goToPageIndex("prev")')
    });

    $pager.append($prevButton);

    for (var i = 0; i<pagesCount; i++) {
        var $pageButton = $('<li>', {
            text: (i+1).toString(),
            class: 'page' + (pageIndex === i ? ' selected' : ''),
            onclick: 'goToPageIndex(' + i + ')'
        });

        $pager.append($pageButton);
    }

    var $nextButton = $('<li>', {
        text: '>',
        class: 'page' + (pageIndex === pagesCount - 1 ? ' disabled' : ''),
        onclick: (pageIndex === pagesCount - 1 ? '' : 'goToPageIndex("next")')
    });

    $pager.append($nextButton);
}

// Let's get started
initLunr();
initUI();