package com.jjangsky.dcs.domain.problem;

import lombok.Getter;


@Getter
public enum Tag {
    OPERATING_SYSTEM("프로세스, 스레드, 메모리 관리 등 운영체제의 핵심 개념"),
    NETWORK("TCP/IP, HTTP, DNS 등 컴퓨터 네트워크 관련 지식"),
    DATABASE("RDBMS, NoSQL, 인덱스, 쿼리 최적화 등 데이터베이스 전반"),
    DATA_STRUCTURE("리스트, 트리, 해시맵 등 자료구조의 동작 원리와 활용"),
    OBJECT_ORIENTED_DESIGN("클래스 설계, SOLID 원칙, 캡슐화 등 객체지향 설계 원칙"),
    DESIGN_PATTERN("GoF 패턴, 전략 패턴, 팩토리 패턴 등 재사용 가능한 설계 패턴"),
    HTTP_AND_REST("HTTP 프로토콜, RESTful API 설계 원칙과 상태 코드 등"),
    AUTHENTICATION_AND_SECURITY("JWT, OAuth2, 암호화, HTTPS 등 인증 및 보안 개념"),
    TESTING("단위 테스트, 통합 테스트, 테스트 더블(Mock, Stub 등) 전략"),
    TRANSACTION_AND_DISTRIBUTED_SYSTEMS("ACID, 2PC, 분산 트랜잭션, eventual consistency 등"),
    SYSTEM_DESIGN("확장성, 가용성, 로드 밸런싱, 캐싱 전략 등 시스템 아키텍처 설계"),
    PERFORMANCE_TUNING("GC 튜닝, SQL 성능 개선, JVM 최적화 등 성능 최적화 전략"),
    LOGGING_AND_MONITORING("ELK, Prometheus, Grafana 등 모니터링과 로깅 시스템 구성"),
    CLOUD_ARCHITECTURE("AWS, GCP, 클라우드 컴퓨팅 모델과 인프라 설계"),
    MESSAGING_AND_EVENT_DRIVEN_ARCHITECTURE("Kafka, RabbitMQ 등 비동기 메시징 기반 아키텍처"),
    SPRING_FRAMEWORK("DI, AOP, Spring MVC 등 스프링 핵심 기능"),
    SPRING_BOOT_CONFIGURATION("application.yml 설정, AutoConfiguration 등 스프링 부트 환경 구성"),
    JAVA_ADVANCED("JVM, Stream API, 람다, 제네릭, 동시성 등 자바 고급 기능"),
    JPA_AND_ORM("Entity 설계, 영속성 컨텍스트, 지연 로딩 등 JPA 및 ORM 개념"),
    BUILD_TOOLS_AND_CICD("Maven, Gradle, Jenkins, GitHub Actions 등 빌드 및 배포 자동화");

    private final String description;

    Tag(String description) {
        this.description = description;
    }

    public static Tag getRandomCategory() {
        Tag[] values = Tag.values();
        return values[(int)(Math.random() * values.length)];
    }
}
