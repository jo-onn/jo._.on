---
title: "Deep Learning 연구 노트"
description: "Transformer 아키텍처를 공부하면서 정리한 핵심 개념들."
date: 2026-02-14
tags: ["deep-learning", "transformer", "AI"]
---

# Deep Learning 연구 노트

Transformer 아키텍처를 처음 접했을 때 어려웠던 개념들을 정리해봤습니다.

## Self-Attention

Self-Attention은 시퀀스 내 각 토큰이 다른 모든 토큰과의 관계를 학습하는 메커니즘입니다.

```python
import torch
import torch.nn.functional as F

def self_attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V)
```

## Multi-Head Attention

여러 개의 Attention Head를 병렬로 실행해 다양한 표현을 학습합니다.
