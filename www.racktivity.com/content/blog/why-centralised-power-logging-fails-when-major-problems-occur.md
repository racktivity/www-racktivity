+++
title = "Why Centralised Power Logging Fails When Major Problems Occur"
page_disc = "Racktivity’s unique approach to power management and environmental monitoring has been designed to allow the industry’s most consultative sales partners and systems integrators to lead with our new generation of best-in-class physical layer solutions."
section_pic = "/images/page-pic.jpg"
+++



- An article by Wilbert Ingels, CTO at Racktivity

**Tighter service-level agreements (SLA) and continuing pressure on carbon footprint reduction are increasingly forcing datacentre managers to consider how to manage the critical elements of their datacentre**.

Many datacentre and infrastructure managers are starting to understand that collecting accurate and detailed power metrics are crucial in keeping datacentres up and running. But the datacentre infrastructure does not just consist of networks and traditional IT equipment, it also includes power systems, air conditioning, and uninterrupted power supplies.
 
These components are part of the datacentre ecosystem and any change to one component can have negative or unwanted impacts on other components. 
Datacentre managers and IT leaders are starting to realise that significant operational benefits can be attained through more-rigorous management of the facility environment of the datacentre.

Therefore, more and more datacentres have started detailed power measurement on individual equipment (chillers, cracks, UPS, etc.), including the different electrical circuits at the different datacentre levels (floor, room and rack level). The first advantage of such an approach is that PUE (PUE0, PUE1 and PUE2) metrics can be calculated easily and made available at the different levels of the datacentre.
 
An additional benefit is that checking customer behavior becomes easy and straightforward, including the possibility of invoicing a customer for their real power consumption. On top of that, the availability of all the needed power metrics offers datacentre managers everything at hand to perform proper capacity management of the datacentre.

The second advantage of detailed power measurement is the possibility of data collecting and postmortem analysis in case of an outage. The amount of data that is available is undeniably linked to the speed of finding the root-cause of an outage. When analysing a postmortem outage, it is crucial to have detailed information of the entire time-lapse of the outage: just before, during and just after the outage. 

It’s also very important to have access to enough detailed information to easily find the cause of the outage. Most systems are based on SNMP polling and - when properly configured - SNMP traps. In a mid-sized datacentre there are at least a few thousand measurement points resulting in a long polling cycle where every measurement point will be updated about every 5 minutes. So collecting real-time values of just before, during and after the outage is simply impossible.

SNMP traps can help, but need to be configured, which is time-consuming. Very often, an outage is a combination of different parameters that cannot be covered by configuring SNMP traps. If the outage also influences the network, it is highly possible that crucial information gets lost. 

The only reliable solution is to build a distributed network of power measurement nodes with built-in storage which can store the crucial power data locally so even when the network is not available, real-time data from before, during and after the outage will be stored anyway.

![](/images/AC-setup.jpg)

An example of a device with this kind of functionality is the [Racktivity AC²Sensor device.](/products/infrastructure-power-management/ac-power-monitoring-ac2meter) It’s a quite small device featuring a DIN rail mountable design, 3-phase voltage in, Ethernet connectivity, connections for up to 8 current clamps and an R-bus, which is a type of RS485 bus that allows users to connect external environmental sensors.
 
What differentiates the [Racktivity device](/products/infrastructure-power-management/ac-power-monitoring-ac2meter) from others is that it also has a built-in SD card with 2GB memory, specifically dedicated to store logging information. The device has a bright OLED screen with very detailed power information of all individual ports (V, VA, W, kWh, kVAh, PF, Hz, THD, harmonics on voltage, harmonics on current etc). It is also the first device of this kind that includes full oscilloscope view on voltage, current and harmonics. 

This device doesn't use the traditional way of storing and overwriting after a certain period of time. Racktivity implemented a more intelligent way of logging: every 5 minutes, a snapshot is taken of all data on all ports including the environmental data. An algorithm looks at the behavior of all ports and data collected, if the data is stable, no additional logging is taken.
 
From the moment that 1 port starts a deviation (having peaks in power usage for example), the system will immediately start taking full snapshots of all information before, during and after the event, so that all crucial information is logged. The system also learns and dynamically adapts its storing behavior depending on the number of anomalies happening.
 
As an illustration, if 1 port always jumps from 50 to 65Amps and back, [the AC²Sensor](/products/infrastructure-power-management/ac-power-monitoring-ac2meter) will log this information in the beginning.  However, once the device discovers a pattern, further logging is stopped to avoid unnecessary filling the storage capacity of the SD card inside the device. 

The detailed information is never deleted on a round robin basis when the SD card gets full. Full detailed information always remains available, even up to months after the outage, until the data is overwritten. The logging can be downloaded and analysed via [Racktivity DCPM](/products/power-management-software) , the company’s in-house developed power management software.
 
As [the device](/products/infrastructure-power-management/ac-power-monitoring-ac2meter) also has a fully-open API, it’s also possible to retrieve the SD logging information through the device’s API.  However, the company hasn’t developed a stand-alone tool for analysing this data yet, so it’s up to the programmer to retrieve and format the available data into individual specific requirements.

**Summary**

All in all the [AC²Sensor](/products/infrastructure-power-management/ac-power-monitoring-ac2meter) proves to be a perfect partner for data centre operators looking to monitor infrastructure power in the most accurate and detailed way, in order to reduce power consumption and improve reliability.

More detailed information on the AC²Sensor [can be found here.](/products/infrastructure-power-management/ac-power-monitoring-ac2meter) 
Or just [contact us](/contact) , should you have questions.

![](/images/ACmodel.png)


<style>
img{
	width: 80%;
	margin: 20px;
}


</style>