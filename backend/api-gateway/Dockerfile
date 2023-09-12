FROM openjdk:17-oracle
LABEL maintainer="Meric Mert Bulca <mericmertbulca@hotmail.com>"

ADD ./target/api-gateway.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/api-gateway.jar"]

EXPOSE 8080
