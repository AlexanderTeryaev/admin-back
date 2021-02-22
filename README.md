# Install SQL SERVER to allow mixed authentication.

## Configuring TCP/IP protocol in SQL SERVER

1. Press (Windows key + R) and type compmgmt.msc in the box, and click Ok

2. Now click on Services and Applications in the left pane and then double click on SQL Server Configuration Manager to open it.

3. Now double click on SQL Server Network configuration on next page

4. Now double click on Protocols for SQL Express

5. The TCP/IP protocol should be enabled if we want to connect Node.js to SQL Server if it’s not enabled then you can enable it by right-clicking the TCP/IP protocol and select Enable

6. Once you have enabled TCP/IP, right-click on it and select Properties

7. In the Pop-up window opened select IP Addresses
Make sure all the TCP Dynamic Ports are set to 0 except for IPAll TCP Dynamic Port. All the TCP ports should be set blank except for IPAll TCP port which needs to be set to 1433


## Create a database in SQL SERVER (named 'node_test' here)

## Install packages

     npm i

## Run server

     node server.js
