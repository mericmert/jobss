FROM openjdk:17-oracle
LABEL maintainer="Meric Mert Bulca <mericmertbulca@hotmail.com>"

ADD ./target/job-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/job-service.jar"]

EXPOSE 8087
