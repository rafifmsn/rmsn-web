---
title: "Usage Guidance"
description: "A brief examples of features provided on this template."
---

## 1. Mathematical Equations

### Inline Equations
Inline math is supported using single dollar signs, for example: $E=mc^2$.
You can also use Greek letters like $\alpha$, $\beta$, and $\gamma$.
Here is a complex inline fraction: $\frac{n!}{k!(n-k)!}$.

This is $E=mc^2$.

Example: `x = 5` and `y = 4`, then `x * y` outputs `20`.

### Block Equations (Display Math)
Block equations are surrounded by double dollar signs:

Version 1:

$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$

Version 2:

$$
\begin{align*}
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
\end{align*}
$$

## 2. Text Formatting
*   **Bold text** using double asterisks.
*   *Italic text* using single asterisks.
*   ~~Strikethrough~~ using double tildes [15].
*   `Inline code` using backticks.

## 3. Lists
1.  First ordered item
2.  Second ordered item
    *   Sub-list item A
    *   Sub-list item B

*   Unordered item
*   Another item

## 4. Tables

| Header 1 | Header 2 | Header 3 |
| :--- | :---: | ---: |
| Left | Center | Right |
| $x^2$ | $y^2$ | $z^2$ |

## 5. Code Block
```
# Python but not specifying code
def hello_world():
    print("Hello, Markdown!")
```

```python
# Specifying code
def hello_world():
    print("Hello, Markdown!")
```

```java
// Longer code
public class LongValueCalculator {

    public static void main(String[] args) {
        // The 'L' suffix indicates that the literal value is a long
        long initialValue = 10_000_000_000L; 
        long valueToAdd1 = 5_000_000_000L;
        long valueToAdd2 = 2_147_483_647L; // Max value of a 32-bit int

        // Check if the initial value is within the range of a long
        System.out.println("Minimum long value: " + Long.MIN_VALUE);
        System.out.println("Maximum long value: " + Long.MAX_VALUE);
        
        // Display initial values
        System.out.println("\nInitial value: " + initialValue);
        System.out.println("Value to add 1: " + valueToAdd1);
        System.out.println("Value to add 2 (Max int): " + valueToAdd2);

        // Perform addition using long
        long totalSum = initialValue + valueToAdd1 + valueToAdd2;

        // Print the result
        System.out.println("\nTotal sum using long: " + totalSum);

        // Example of using the Long wrapper class and its static methods
        String stringValue = "15000000000";
        long parsedLong = Long.parseLong(stringValue); // Converts a string to a primitive long
        
        Long wrappedLong = Long.valueOf(parsedLong); // Wraps the primitive long in a Long object

        System.out.println("\nParsed string value: " + parsedLong);
        System.out.println("Wrapped Long object value: " + wrappedLong.longValue());
    }
}
```

## 6. Iframes

<iframe class="embed-video" src="https://www.youtube.com/embed/PVEQ251e1n0?si=bArgw4zL7zs_Rzq4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe
class="embed-standard" id="geckoterminal-embed" title="GeckoTerminal Embed" allow="clipboard-write"
allowfullscreen src="https://www.geckoterminal.com/eth/pools/0xB8c77482e45F1F44dE1745F52C74426C631bDD52?embed=1&info=0&swaps=0&light_chart=0&chart_type=price&resolution=1d&bg_color=0a0a0a" frameborder="0">
</iframe>

## 7. Twitter

<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr">Today, we&#39;re also thrilled to show you Next.js Live.<br><br>We overhauled Next.js so it can run entirely inside the web browser, enabling anyone to code in the browser, with their team, in real-time.<br><br>Learn how your team can try it.<a href="https://t.co/kOZZPtSuRM">https://t.co/kOZZPtSuRM</a></p>&mdash; Vercel (@vercel) <a href="https://twitter.com/vercel/status/1404833080435634179?ref_src=twsrc%5Etfw">June 15, 2021</a></blockquote>