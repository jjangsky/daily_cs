package com.jjangsky.dcs.domain.problem;

import com.jjangsky.dcs.domain.AbstractEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@DynamicUpdate
public class Problem extends AbstractEntity {

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Level level;

    @Column(columnDefinition = "TEXT")
    private String hint;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tag tag;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Builder
    public static Problem create(String content, Level level, String hint, Tag tag) {
        Problem problem = new Problem();
        problem.content = content;
        problem.level = level;
        problem.hint = hint;
        problem.tag = tag;
        problem.createdAt = LocalDateTime.now();
        return problem;
    }
}
