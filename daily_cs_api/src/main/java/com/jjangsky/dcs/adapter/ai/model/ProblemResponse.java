package com.jjangsky.dcs.adapter.ai.model;

import com.jjangsky.dcs.domain.problem.Level;
import com.jjangsky.dcs.domain.problem.Tag;

public record ProblemResponse(String problem, Tag tag, Level level, String hint) {
}
