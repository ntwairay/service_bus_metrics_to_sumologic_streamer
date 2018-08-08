# NewRelic Metrics Streamer to Sumologic (VSTS and AZ Function)
This script is written in Nodejs which will be created as an Azure function, deployed by VSTS Pipeline
It runs your query (**src/query.js**)to pull the metrics from Newrelic (Azure integration service) and export them to Sumologic.

## Getting started

Requirement:

1. Free VSTS Account (https://visualstudio.microsoft.com/team-services/pricing/)
2. Azure Service principal
3. NewRelic Account number, Query Key and integration service setup with Azure
4. SumoLogic Session Key, Endpoint, Source name and Source category

Setup in VSTS

1. Create new project
2. Setup a new pipeline to read step by .vsts-ci.yml
3. Setup the service connection to your Azure account in the new project
4. Replace "YOUAZUREACCOUNT" in .vsts-ci.yml
5. Create variables group in VSTS (***look at overrideParameters row in .vsts-ci.yml***)


Local Deployment (Nodejs)

1. Uncomment codes in index.js and metricsProcessor.js
2. Export variables
3. npm install
4. node src/index.js
