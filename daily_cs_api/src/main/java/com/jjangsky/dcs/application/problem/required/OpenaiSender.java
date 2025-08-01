package com.jjangsky.dcs.application.problem.required;

import com.jjangsky.dcs.adapter.ai.model.ProblemResponse;
import com.jjangsky.dcs.adapter.ai.model.SubmitResponse;

public interface OpenaiSender {
    ProblemResponse createProblem(String problemContent, String problemType);

    SubmitResponse submitProblem(String problemContent, String answerContent, String problemType, String problemLevel, String problemCategory);
}
