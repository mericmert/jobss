FROM openjdk:17-oracle
LABEL maintainer="Meric Mert Bulca <mericmertbulca@hotmail.com>"

ADD ./target/application-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/application-service.jar"]

EXPOSE 8081
