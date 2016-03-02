+++
title = "New DCPM Release 1.4"
page_disc = "Racktivity’s unique approach to power management and environmental monitoring has been designed to allow the industry’s most consultative sales partners and systems integrators to lead with our new generation of best-in-class physical layer solutions."
section_pic = "/images/page-pic.jpg"
+++



Racktivity proudly announces the new release (1.4.0) of its award winning DCPM (Data Center Performance Manager) software. This new release has several new features based on the latest market requirements.

We strongly advice all DCPM users to perform an upgrade of the current installed version to our latest version 1.4.0.



**Remark:** There are two options for installing DCPM version 1.4

1. Adding a new clear install

2. Perform an upgrade from the latest version 1.3.5. Users that are using an older version of DCPM need to upgrade to version 1.3.5 first. During this upgrade no data will be lost.



For upgrading your system please contact:

**email:** <a href="mailto:Lesley.zonnekein@racktivity.com">Lesley.zonnekein@racktivity.com</a>

**Phone:** +32 495 12 12 55

**Download the latest DCPM manual:** 

[http://www.racktivity.com/sites/default/files/DCPM-Manual.pdf](http://www.racktivity.com/sites/default/files/DCPM-Manual.pdf)


Below the release notes for DCPM version 1.4:

* reports:

	* formulas in reports
	* input metrics in reports
	* monthly/weekly/daily automatic reporting (pdf, csv) (sent to email)
	* redone reports presented with macros (examples in Report space)

* maps:

	* formulas on maps
	* input metrics on maps

* alarms:
	* alarms triggered by formula values
	* redone snmp alarms - speed up, early validation
	* added more information to user alarm definition list on pages
* graphs:
	* new graphs - auto refresh, new look and feel, synchronization between them
	* annotations on graphs (alarms)
	* zooming graphs on y axis
* hardware integration:
	* batteries integration on delta rectifier
	* battery test reports on delta rectifier
	* tunneling to hardware
	* calculated line current on apc ats (for hw that does not give data)
* default tags removed from edit wizards
* line names in monitormodules
* synchronization of names with hardware (line/device level)
* default credentials for pdu/monitormodule setup
* quicker pdu discovery
* added “add pdu” action on rack to manually add pdu
* outlet switching reported in audit log
* total power macro can report either input, output data or both
* smtp settings test on change
* possibility to omit some comment message boxes
* improved installation procedure
* implementation of AC2 version 3.0 



* bugfixes:
	* rsyslog restart should not bring dcpm logs outside of chroot
	* ui presentation fixes
	* raritan port status not shown properly on pdu actions
	* installation script works for directories with spaces
	* formulas calculated on time period were rendering with no data on next period start
	* error on pdu reconfiguration/edit
	* errors on non-existing formula rendering
	* viewer user had no access to all facts tables
	* agent command on devices that are not reachable generated errors