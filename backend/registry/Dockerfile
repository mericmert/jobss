FROM openjdk:17-oracle
LABEL maintainer="Meric Mert Bulca <mericmertbulca@hotmail.com>"

ADD ./target/registry.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/registry.jar"]

EXPOSE 8761
