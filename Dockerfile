# syntax=docker/dockerfile:1

FROM sagcr.azurecr.io/webmethods-microservicesruntime:10.15

USER root

RUN  mkdir -p /opt/AppSimData

RUN  mkdir -p /opt/softwareag/IntegrationServer/packages/AppSim

RUN chown sagadmin:sagadmin /opt/AppSimData /opt/softwareag/IntegrationServer/packages/AppSim

USER sagadmin

COPY  appsim-ispkg/ /opt/softwareag/IntegrationServer/packages/AppSim/

COPY  appsim-ui/dist/app-sim-ui/ /opt/softwareag/IntegrationServer/packages/AppSim/pub/

USER root

RUN chown -R sagadmin:sagadmin /opt/softwareag/IntegrationServer/packages/AppSim/
