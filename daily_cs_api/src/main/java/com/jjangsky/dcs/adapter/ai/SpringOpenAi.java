package com.jjangsky.dcs.adapter.ai;

import com.jjangsky.dcs.adapter.ai.model.ProblemResponse;
import com.jjangsky.dcs.adapter.ai.model.SubmitResponse;
import com.jjangsky.dcs.application.problem.required.OpenaiSender;
import com.jjangsky.dcs.domain.problem.Level;
import com.jjangsky.dcs.domain.problem.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class SpringOpenAi implements OpenaiSender {

    private final ChatClient chatClient;


    @Override
    public ProblemResponse createProblem(String problemContent, String problemType) {
        log.info("Creating problem with OpenAI - Type: {}, Level: {}, Category: {}", problemType);

        String problemLevel = Level.randomLevel();
        String problemCategory = Tag.getRandomCategory();
        String systemPrompt = """
            당신은 컴퓨터 과학 문제 출제 전문가입니다.
            요청된 주제, 난이도, 카테고리에 맞는 문제를 생성해주세요.
            문제는 명확하고 구체적이어야 하며, 개발자들이 CS 면접에 도움이 될 수 있도록 기획되어야 합니다.
            응답은 다음 형식을 따라주세요: 
            
            문제: [문제 내용]
            힌트: [문제 해결에 도움이 되는 힌트]
            """;

        String userPrompt = String.format("""
            다음 조건에 맞는 문제를 생성해주세요:
            - 주제: %s
            - 난이도: %s
            - 카테고리: %s
            - 추가 내용: %s
            """, problemType, problemLevel, problemCategory, problemContent);

        try {
            String response = chatClient.prompt()
                    .system(systemPrompt)
                    .user(userPrompt)
                    .call()
                    .content();

            // Parse response to extract problem and hint
            String problem = extractSection(response, "문제:");
            String hint = extractSection(response, "힌트:");

            Tag tag = Tag.valueOf(problemCategory);
            Level level = Level.valueOf(problemLevel);

            return new ProblemResponse(problem, tag, level, hint);
        } catch (Exception e) {
            log.error("Failed to create problem with OpenAI", e);
            throw new RuntimeException("Failed to create problem", e);
        }
    }

    @Override
    public SubmitResponse submitProblem(String problemContent, String answerContent, String problemType, String problemLevel, String problemCategory) {
        log.info("Submitting answer for evaluation - Type: {}, Level: {}", problemType, problemLevel);

        String systemPrompt = """
            당신은 컴퓨터 과학 문제의 답변을 평가하는 전문가입니다.
            제출된 답변을 분석하고, 정확성과 완성도를 평가해주세요.
            피드백은 건설적이고 학습에 도움이 되도록 작성해주세요.
            응답은 다음 형식을 따라주세요:
            
            평가점수: [0-100 사이의 점수]
            피드백: [상세한 피드백 내용]
            """;

        String userPrompt = String.format("""
            다음 문제에 대한 답변을 평가해주세요:
            
            문제:
            %s
            
            제출된 답변:
            %s
            
            문제 유형: %s
            난이도: %s
            카테고리: %s
            """, problemContent, answerContent, problemType, problemLevel, problemCategory);

        try {
            String response = chatClient.prompt()
                    .system(systemPrompt)
                    .user(userPrompt)
                    .call()
                    .content();

            // Parse response to extract score and feedback
            String scoreStr = extractSection(response, "평가점수:");
            String feedback = extractSection(response, "피드백:");

            Integer score = Integer.parseInt(scoreStr.replaceAll("[^0-9]", ""));

            return new SubmitResponse(problemContent, feedback, score);
        } catch (Exception e) {
            log.error("Failed to evaluate answer with OpenAI", e);
            throw new RuntimeException("Failed to evaluate answer", e);
        }
    }

    private String extractSection(String text, String sectionMarker) {
        int startIndex = text.indexOf(sectionMarker);
        if (startIndex == -1) {
            return "";
        }

        startIndex += sectionMarker.length();
        int endIndex = text.indexOf("\n", startIndex);

        if (endIndex == -1) {
            return text.substring(startIndex).trim();
        }

        // Check if there's another section marker
        int nextSectionIndex = text.indexOf(":", endIndex);
        if (nextSectionIndex != -1 && text.lastIndexOf("\n", nextSectionIndex) > endIndex) {
            endIndex = text.lastIndexOf("\n", nextSectionIndex);
        } else {
            endIndex = text.length();
        }

        return text.substring(startIndex, endIndex).trim();
    }
}

