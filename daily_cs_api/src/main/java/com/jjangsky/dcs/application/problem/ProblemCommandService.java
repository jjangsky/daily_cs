package com.jjangsky.dcs.application.problem;

import com.jjangsky.dcs.application.problem.provided.ProblemRegister;
import com.jjangsky.dcs.domain.problem.Problem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProblemCommandService implements ProblemRegister {

    @Override
    public Problem register() {

        return null;
    }
}
