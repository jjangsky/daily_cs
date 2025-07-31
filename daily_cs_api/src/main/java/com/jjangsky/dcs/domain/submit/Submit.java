package com.jjangsky.dcs.domain.submit;


import com.jjangsky.dcs.domain.AbstractEntity;
import com.jjangsky.dcs.domain.member.Member;
import com.jjangsky.dcs.domain.problem.Problem;
import jakarta.persistence.*;
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
public class Submit extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    @Column(nullable = false)
    private LocalDateTime registeredAt;

    @Column
    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(nullable = false)
    private final boolean isPublished = false;

    @Column(nullable = false)
    private final boolean isDeleted = false;

    @Column
    private LocalDateTime deletedAt;
}
