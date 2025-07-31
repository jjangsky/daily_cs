package com.jjangsky.dcs.application.problem.required;

import com.jjangsky.dcs.domain.problem.Problem;
import org.springframework.data.repository.Repository;

public interface ProblemRepository extends Repository<Problem, Long> {
    Problem save(Problem problem);
}
