export const problems = [
    {
      id: "two-sum",
      title: "Two Sum",
      solution: `class Solution:
      def twoSum(self, nums: List[int], target: int) -> List[int]:
          num = defaultdict(int)
          
          for i in range(len(nums)):
              if (target - nums[i]) in num:
                  return [i, num[target - nums[i]]]
              else:
                  num[nums[i]] = i`
    },
    {
      id: "valid-parentheses",
      title: "Valid Parentheses",
      solution: `class Solution:
      def isValid(self, s: str) -> bool:
          stack = []
          pair = {")":"(", "]":"[", "}":"{"}
          
          for ch in s:
              if ch in pair:
                  if not stack or stack.pop() != pair[ch]:
                      return False
              else:
                  stack.append(ch)
          return not stack`
    },
    {
      id: "fibonacci",
      title: "Fibonacci (DP)",
      solution: `class Solution:
      def fib(self, n: int) -> int:
          if n < 2:
              return n
          a, b = 0, 1
          for _ in range(n-1):
              a, b = b, a + b
          return b`
    }
  ];
  