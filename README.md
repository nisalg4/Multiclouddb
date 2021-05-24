# Multiclouddb

This application demonstrates that database searching can be faster by breaking down large databases into chunks. 
The first server which can be seen in moon folder does all the processing .
When an entry is made Moon chooses a random server on the network and stores the entry on that database.
When a user wants to find an entry moon sends multiple requests to all the computers on the network which imitates a concurrent process rather than a linear one.
Mathematically the more the number of computers the network has the faster the searching goes.

https://www.cloudsandmoon.com/ for more information

This code is only for viewing purposes and may not be reproduced without my approval.
