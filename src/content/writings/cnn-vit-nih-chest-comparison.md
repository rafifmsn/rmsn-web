---
title: "DenseNet-121 Outperforms ViT-B/16 on the NIH Chest X-ray Dataset Sample"
date: "November 20, 2025"
summary: "A comparative study proving that DenseNet-121’s local feature extraction identifies rare diseases in chest X-rays more effectively than Vision Transformers when data is limited"
---

## 1. Introduction

### 1.1 The Challenge of Computer
Chest X-ray examinations are among the most frequent and cost-effective medical imaging procedures available today. However, interpreting them is far from simple; clinical diagnosis from a chest X-ray can sometimes be more difficult than diagnosis via chest CT imaging.

For years, the development of clinically relevant Computer-Aided Detection and Diagnosis (CAD) systems has been stalled by a single, major hurdle: data. Deep learning models require massive amounts of annotated data, but in the medical field, resources for labeling thousands of images are scarce.

### 1.2 Motivation: The Data Imbalance Problem
The release of the NIH Chest X-ray Dataset, comprising over 112,120 images, significantly changed this landscape. However, real-world medical data brings real-world problems. For this experiment, a 5% random sample (5,606 images) was used to simulate a constrained data environment.

This sample highlights extreme class imbalance: the "No Finding" class accounts for 53.84% of the data, while pathologies like Hernia (0.20%), Pneumonia (1.28%), and Fibrosis (1.50%) are incredibly rare. This creates a "long-tail" distribution where a model can achieve high accuracy simply by guessing "healthy" every time while failing to detect critical, rare diseases.

### 1.3 The Players: DenseNet-121 vs. ViT-Base/16
To tackle this challenge, two distinct architectures were compared:
- DenseNet-121 (The Incumbent): A parameter-efficient CNN that relies on convolutional layers for local feature extraction and translation invariance.
- ViT-Base/Patch-16 (The Challenger): A Vision Transformer that uses a self-attention mechanism to model global relationships across the entire image.

### 1.4 The Hypothesis
The central question was which architecture possesses the right inductive biases for this constrained environment. The hypothesis tested whether the ViT's global context could outweigh the CNN's efficiency when dealing with small and highly imbalanced medical datasets.

---

## 2. Methodology

### 2.1 The Metric that Matters
In a highly imbalanced medical dataset, standard accuracy is a trap. A model could predict "No Finding" for every image and achieve ~54% accuracy without diagnosing a single sick patient. Therefore, the primary yardstick was the Macro-Averaged F1 Score. Macro F1 treats every class equally, revealing the true ability of the model to detect rare diseases regardless of class size.

### 2.2 Model Setup
Both models were adapted for multi-label classification with a final layer outputting 15 classes (14 diseases + "No Finding"). Binary Cross-Entropy (BCEWithLogitsLoss) was used as the loss function.

|Feature          |DenseNet-121 (CNN)           |ViT-Base/Patch-16 (Transformer)|
|-----------------|-----------------------------|-------------------------------|
|Architecture Type|Convolutional Neural Network |Vision Transformer             |
|Input Size       |224×224 pixels               |224×224 pixels                 |
|Batch Size       |32                           |16                             |
|Learning Rate    |1×10−4                       |5×10−5                         |

---

## 3. Results & Analysis
After 8 epochs, the results provided a clear answer: the CNN demonstrated significantly better robustness for this specific task.

### 3.1 By the Numbers

| Metric               | DenseNet-121 (CNN) | ViT-Base/16 (Transformer) |
|----------------------|--------------------|---------------------------|
| Validation Loss      | 0.1946             | 0.2086                    |
| Macro Avg F1 Score   | 0.0623             | 0.0472                    |
| Exact Match Accuracy | 0.4144             | 0.4332                    |

### 3.2 Why the CNN Won
The "Inductive Bias" Advantage was the most significant factor. The DenseNet-121 achieved non-zero F1 scores for moderately rare diseases like Effusion (0.13) and Infiltration (0.08). Its convolutional layers inherently look for local features like edges and textures, allowing it to generalize better with limited examples.

Conversely, the ViT scored a 0.00 F1 on these same minority classes. Without the inductive bias of convolutions, the ViT needed far more data to learn these specific pathologies and essentially collapsed into predicting the majority class.

---

## 4. Conclusion
DenseNet-121 is more robust and better suited for transfer learning on imbalanced medical datasets. While the ViT achieved a higher Exact Match Accuracy, this was an "illusion" caused by its proficiency in predicting the dominant "No Finding" class.

Future iterations should address class imbalance through weighted loss functions (like Focal Loss), resampling techniques, or hybrid models that combine local feature extraction with global context awareness.

---

## 5. References

- Dataset Source: [NIH Chest X-ray Dataset Sample (5%)](https://www.kaggle.com/datasets/nih-chest-xrays/sample)
- Original Paper: Wang X, et al. ChestX-ray8: Hospital-scale Chest X-ray Database and Benchmarks on Weakly-Supervised Classification and Localization of Common Thorax Diseases. IEEE CVPR 2017.

---

## 6. Links

Read full (PDF): [Scribd](https://www.scribd.com/document/967612201/DenseNet-121-Edges-ViT-on-Chest-X-rays) - [GDrive](https://drive.google.com/file/d/14iNRlIAx_kfufN1dCEEmgIb_TohXoQ2u/view?usp=drive_link)