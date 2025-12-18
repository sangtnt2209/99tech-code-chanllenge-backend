## 🚀 Quick Start

### 📋 Prerequisites

Before running the script, ensure you have the following installed:

* **Node.js**: Version 18.0.0 or higher.
* **npx**: Included by default with Node.js (npm v5.2+).
* **Terminal**: Any standard terminal (Bash, Zsh, PowerShell, or Command Prompt).

### How to check your version:
```bash
node -v
```
### Run via npx (No install needed)
```bash
npx tsx main.ts
```

## 🧪 Testing & Validation

The application includes a comprehensive testing suite that validates the robustness of the summation algorithms against various edge cases.



### Test Input Scenarios
The `main.ts` script executes tests against the following inputs to ensure stability:

| Input | Expected Behavior | Reason |
| :--- | :--- | :--- |
| `100` | **Success** | Standard positive integer. |
| `10000` | **Recursive Error** | Exceeds the defined `MAX_RECURSION_LIMIT`. |
| `-5` | **Validation Error** | Input must be non-negative. |
| `1.5` | **Validation Error** | Input must be a whole integer. |
| `MAX_SAFE_INT + 1` | **Validation Error** | Prevents precision loss before `BigInt` conversion. |
| `"aasasd"` | **Type Error** | Strict validation rejects non-numeric types. |
| `true` | **Type Error** | Strict validation rejects booleans. |

## 🧮 Computational Performance

The application includes an internal service to handle large summations with the following performance metrics:

### Method Constraints
* **Formula ($O(1)$)**: Executes instantly. Uses `BigInt` to handle results larger than $2^{53}-1$.
* **Loop ($O(n)$)**: Safe for large inputs up to `MAX_SAFE_INTEGER`, though execution time increases linearly.
* **Recursion ($O(n)$)**: Strictly capped at 10,000 to prevent **Stack Overflow** errors.

### Validation Logic
All inputs are strictly validated:
1.  Must be a valid integer.
2.  Must be non-negative.
3.  Must not exceed `Number.MAX_SAFE_INTEGER`.