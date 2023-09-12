FROM openjdk:17-oracle
LABEL maintainer="Meric Mert Bulca <mericmertbulca@hotmail.com>"

ADD ./target/notification-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/notification-service.jar"]

EXPOSE 8089
