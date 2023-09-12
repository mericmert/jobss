FROM openjdk:17-oracle
LABEL maintainer="Meric Mert Bulca <mericmertbulca@hotmail.com>"

ADD ./target/user-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/user-service.jar"]

EXPOSE 8084
