class SummationService {
    // Typical Node.js limit for recursion to avoid "Maximum call stack size exceeded"
    private static readonly MAX_RECURSION_DEPTH = 10000;

    /**
     * 1. Iterative Approach (Loop)
     * Complexity: 
     * - Time: O(n) - Scales linearly with the size of n.
     * - Space: O(1) - Uses a constant amount of memory for the 'total' variable.
     * Constraints:
     * - Safe up to Number.MAX_SAFE_INTEGER as an input.
     * - Execution time becomes noticeable as n exceeds 10^8.
     */
    public sumWithLoop(n: any): bigint {
        SummationService.validateInput(n);
        let total = BigInt(0);
        for (let i = 1; i <= n; i++) {
            total += BigInt(i);
        }
        return total;
    }

    /**
     * 2. Mathematical Formula (Arithmetic Progression)
     * Complexity: 
     * - Time: O(1) - Constant time regardless of how large n is.
     * - Space: O(1) - Only requires memory for the result.
     * Constraints:
     * - The most efficient method.
     * - Input must still be validated to prevent overflow during internal calculation,
     * though BigInt handles this much better than the standard Number type.
     */
    public sumWithFormula(n: any): bigint {
        SummationService.validateInput(n);
        const bn = BigInt(n);
        // Formula: (n * (n + 1)) / 2
        return (bn * (bn + BigInt(1))) / BigInt(2);
    }

    /**
     * 3. Recursive Approach
     * Complexity: 
     * - Time: O(n) - One function call for every decrement of n.
     * - Space: O(n) - Each call adds a frame to the execution stack.
     * Constraints:
     * - Strictly limited by the "Maximum Call Stack Size".
     * - Will crash for large n (usually > 10,000) unless optimized or guarded.
     */
    public sumWithRecursive(n: any): bigint {
        SummationService.validateInput(n);

        // Strict constraint check for Call Stack safety
        if (n > SummationService.MAX_RECURSION_DEPTH) {
            throw new Error(
                `Input ${n} exceeds maximum safe recursion depth (${SummationService.MAX_RECURSION_DEPTH}).`
            );
        }

        return this.recursiveHelper(BigInt(n));
    }

    private recursiveHelper(n: any): bigint {
        if (n <= BigInt(1)) return n;
        return n + this.recursiveHelper(n - BigInt(1));
    }

    /**
     * Strict Validation
     * Ensures input is a safe, non-negative integer.
     */
    private static validateInput(n: any): void {
        if (!Number.isInteger(n)) {
            throw new Error("Input must be a valid integer.");
        }
        if (n < 0) {
            throw new Error("Input must be a non-negative integer.");
        }
        if (n > Number.MAX_SAFE_INTEGER) {
            throw new Error(`Input exceeds MAX_SAFE_INTEGER (${Number.MAX_SAFE_INTEGER}).`);
        }
    }
}

async function main() {
    const sumService = new SummationService();

    const testInputs = [100, 10000, -5, 1.5, Number.MAX_SAFE_INTEGER + 1, "aasasd", true];

    for (const n of testInputs) {
        console.log(`\n--- Testing Summation for n = ${n} ---`);

        // 1. Formula Approach
        try {
            const formulaResult = sumService.sumWithFormula(n);
            console.log(`[Formula] Result: ${formulaResult}`);
        } catch (error: any) {
            // Catching validation and stack limit errors
            console.error(`[Formula][Error] Failed to calculate sum for ${n}: ${error.message}`);
        }

        // 2. Loop Approach
        try {
            const loopResult = sumService.sumWithLoop(n);
            console.log(`[Loop] Result: ${loopResult}`);
        } catch (error: any) {
            // Catching validation and stack limit errors
            console.error(`[Loop][Error] Failed to calculate sum for ${n}: ${error.message}`);
        }

        // 3. Recursive Approach
        try {
            const recursiveResult = sumService.sumWithRecursive(n);
            console.log(`[Recursive] Result: ${recursiveResult}`);

        } catch (error: any) {
            // Catching validation and stack limit errors
            console.error(`[Recursive][Error] Failed to calculate sum for ${n}: ${error.message}`);
        }
    }
}

main().catch(err => console.error("Unhandled global error:", err));