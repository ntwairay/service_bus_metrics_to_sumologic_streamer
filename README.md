# NewRelic Metrics Streamer to Sumologic (VSTS and Azure Function)
This script is written in Nodejs which will be created as an Azure function, deployed by VSTS Pipeline. It runs your query (src/query.js)to pull the metrics from Newrelic (Azure integration service) and send them to Sumologic as logs or metrics.

# Repository Structure
Arm folder contains arm template which is foundation of this Functionapp (metrics streamer), is going to be used during build and release
```
├── arm
│   ├── azuredeploy.json
│   └── azuredeploy.parameters.json
```

Config folder is the place where the core configuration files are stored
- appconfig.js defines where the secrets is going to be used
- queryconfig.js defines the NewRelic NRQL that is going to determine what metrics to be pushed to Sumologic.
```
├── config
│   ├── appconfig.js
│   └── queryconfig.js
```

Src folder contains the core source codes for Metrics Streamer.
- function.json which is part of the configuration for Functionapp, defines the schedule in to execute the program
- index.js is the entry point of Metrics Streamer
- metricsProcessor.js is the place to call the NewRelic Api to request the Azure metrics
- sumologger.js is to send the metrics to Sumologic
```
├── src
│   ├── function.json
│   └── index.js
│   └── metricsProcessor.js
│   └── sumologger.js
```

# Tests
Metrics Streamer is using Mocha and Chai to run unit test. The current unit test case is to test connection to NewRelic API and also test the NRQL Query where you are going to define in /config/queryconfig.js

## How to run the unit test ?
```
npm install
npm install --global mocha
mocha tests
```

## Getting started

### Build from VSTS
The build pipeline is defined by .vsts-ci.yml which contains 4 phases

```
- test_foundation_deployment (test the arm template by deployment to testing Azure account and it will be deleted at the end of the process)
- publish_template_artifacts (version the arm template and push to artifacts)
- build_test                 (run mocha to test the query config)
- publish_build_artifacts    (push the source to artifacts)
```

#### Requirement
1. Azure Service principal
2. NewRelic Account number, Query Key and integration service setup with Azure
3. SumoLogic Session Key, Endpoint, Source name and Source category
4. Create variables group in VSTS

```
QUERYKEY      - (NewRelic)
ACCOUNTID     - (NewRelic)
PROVIDERID    - (NewRelic)
ENDPOINT       - (SumoLogic)
SESSIONKEY     - (SumoLogic)
SOURCENAME     - (SumoLogic)
SOURCECATEGORY - (SumoLogic)
```

#### Flag to switch between sending data to Sumologic as logs or metrics
Metric in Sumologic doesn't need a collector in which doesn't require session key, source category and source name. Therefore if those variables are empty, then the program will assume sending data as metric to Sumologic. Also the variables rockendService and azureService are important as it helps to differentiate/spilt the data and generate a reasonable name for each metrics

### Release from VSTS
This repository doesn't contain any release pipeline as it should be part of the release deployment for each Rockend services
(Refer to InvoiceGenius.Notification Release Pipeline for an example)

#### NewRelic Query Key Setup
https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api

#### SumoLogic Session Key Setup
https://help.sumologic.com/Manage/Security/Access-Keys
