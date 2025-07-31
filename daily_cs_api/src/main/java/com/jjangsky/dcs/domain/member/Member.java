package com.jjangsky.dcs.domain.member;

import com.jjangsky.dcs.domain.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.NaturalIdCache;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@DynamicUpdate
@NaturalIdCache
public class Member extends AbstractEntity {

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String passwordHash;

    @Column
    private String profileImageUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    private LocalDateTime registeredAt;

    @Column
    private LocalDateTime lastLoginAt;

    @Column(nullable = false)
    private final boolean isGitAgreed = false;

    @Column
    private LocalDateTime gitAgreedAt;
}
