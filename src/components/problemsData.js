export const problems = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays & Hashing",
      solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const diff = target - nums[i];
      if (map.has(diff)) return [map.get(diff), i];
      map.set(nums[i], i);
    }
  }`,
    },
    {
      id: "valid-anagram",
      title: "Valid Anagram",
      difficulty: "Easy",
      category: "Arrays & Hashing",
      solution: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let ch of s) count[ch] = (count[ch] || 0) + 1;
    for (let ch of t) {
      if (!count[ch]) return false;
      count[ch]--;
    }
    return true;
  }`,
    },
    {
      id: "contains-duplicate",
      title: "Contains Duplicate",
      difficulty: "Easy",
      category: "Arrays & Hashing",
      solution: `function containsDuplicate(nums) {
    const set = new Set();
    for (let n of nums) {
      if (set.has(n)) return true;
      set.add(n);
    }
    return false;
  }`,
    },
    {
      id: "group-anagrams",
      title: "Group Anagrams",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      solution: `function groupAnagrams(strs) {
    const map = new Map();
    for (let s of strs) {
      const key = s.split('').sort().join('');
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    }
    return Array.from(map.values());
  }`,
    },
    {
      id: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      solution: `function topKFrequent(nums, k) {
    const count = {};
    for (let n of nums) count[n] = (count[n] || 0) + 1;
    return Object.entries(count)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,k)
      .map(x=>+x[0]);
  }`,
    },
    {
      id: "product-of-array-except-self",
      title: "Product of Array Except Self",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      solution: `function productExceptSelf(nums) {
    const res = Array(nums.length).fill(1);
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
      res[i] = prefix;
      prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
      res[i] *= suffix;
      suffix *= nums[i];
    }
    return res;
  }`,
    },
    {
      id: "encode-and-decode-strings",
      title: "Encode and Decode Strings",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      solution: `// For conceptual understanding, used in interviews
  function encode(strs) {
    return strs.map(s => s.length + '#' + s).join('');
  }
  function decode(s) {
    const res = [];
    let i = 0;
    while (i < s.length) {
      let j = i;
      while (s[j] !== '#') j++;
      const len = parseInt(s.slice(i, j));
      res.push(s.slice(j + 1, j + 1 + len));
      i = j + 1 + len;
    }
    return res;
  }`,
    },
    {
      id: "longest-consecutive-sequence",
      title: "Longest Consecutive Sequence",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      solution: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (let n of nums) {
      if (!set.has(n - 1)) {
        let length = 1;
        while (set.has(n + length)) length++;
        longest = Math.max(longest, length);
      }
    }
    return longest;
  }`,
    },
    {
      id: "valid-sudoku",
      title: "Valid Sudoku",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      solution: `function isValidSudoku(board) {
    const rows = Array(9).fill().map(()=>new Set());
    const cols = Array(9).fill().map(()=>new Set());
    const boxes = Array(9).fill().map(()=>new Set());
  
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c];
        if (val === '.') continue;
        const box = 3 * Math.floor(r / 3) + Math.floor(c / 3);
        if (rows[r].has(val) || cols[c].has(val) || boxes[box].has(val))
          return false;
        rows[r].add(val);
        cols[c].add(val);
        boxes[box].add(val);
      }
    }
    return true;
  }`,
    },
    {
      id: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Two Pointers / Sliding Window",
      solution: `function lengthOfLongestSubstring(s) {
    let set = new Set();
    let l = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
      while (set.has(s[r])) {
        set.delete(s[l]);
        l++;
      }
      set.add(s[r]);
      res = Math.max(res, r - l + 1);
    }
    return res;
  }`,
    },
    {
      id: "longest-repeating-character-replacement",
      title: "Longest Repeating Character Replacement",
      difficulty: "Medium",
      category: "Sliding Window",
      solution: `function characterReplacement(s, k) {
    let count = {};
    let res = 0;
    let l = 0, maxf = 0;
    for (let r = 0; r < s.length; r++) {
      count[s[r]] = (count[s[r]] || 0) + 1;
      maxf = Math.max(maxf, count[s[r]]);
      while ((r - l + 1) - maxf > k) {
        count[s[l]]--;
        l++;
      }
      res = Math.max(res, r - l + 1);
    }
    return res;
  }`,
    },
    {
      id: "permutation-in-string",
      title: "Permutation in String",
      difficulty: "Medium",
      category: "Sliding Window",
      solution: `function checkInclusion(s1, s2) {
    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    const a = 'a'.charCodeAt(0);
    for (let c of s1) need[c.charCodeAt(0) - a]++;
    let l = 0;
    for (let r = 0; r < s2.length; r++) {
      window[s2.charCodeAt(r) - a]++;
      if (r - l + 1 > s1.length) {
        window[s2.charCodeAt(l) - a]--;
        l++;
      }
      if (need.every((v, i) => v === window[i])) return true;
    }
    return false;
  }`,
    },
    {
      id: "minimum-window-substring",
      title: "Minimum Window Substring",
      difficulty: "Hard",
      category: "Sliding Window",
      solution: `function minWindow(s, t) {
    if (!t) return "";
    const countT = {}, window = {};
    for (let c of t) countT[c] = (countT[c] || 0) + 1;
    let have = 0, need = Object.keys(countT).length;
    let res = [-1, -1], resLen = Infinity;
    let l = 0;
    for (let r = 0; r < s.length; r++) {
      const c = s[r];
      window[c] = (window[c] || 0) + 1;
      if (countT[c] && window[c] === countT[c]) have++;
      while (have === need) {
        if ((r - l + 1) < resLen) {
          res = [l, r];
          resLen = r - l + 1;
        }
        window[s[l]]--;
        if (countT[s[l]] && window[s[l]] < countT[s[l]]) have--;
        l++;
      }
    }
    return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
  }`,
    },
    {
      id: "valid-palindrome",
      title: "Valid Palindrome",
      difficulty: "Easy",
      category: "Two Pointers",
      solution: `function isPalindrome(s) {
    s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    let l = 0, r = s.length - 1;
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++; r--;
    }
    return true;
  }`,
    },
    {
      id: "three-sum",
      title: "3Sum",
      difficulty: "Medium",
      category: "Two Pointers",
      solution: `function threeSum(nums) {
    nums.sort((a,b)=>a-b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i-1]) continue;
      let l = i+1, r = nums.length-1;
      while (l < r) {
        const sum = nums[i] + nums[l] + nums[r];
        if (sum === 0) {
          res.push([nums[i], nums[l], nums[r]]);
          while (nums[l] === nums[l+1]) l++;
          while (nums[r] === nums[r-1]) r--;
          l++; r--;
        } else if (sum < 0) l++;
        else r--;
      }
    }
    return res;
  }`,
    },
    {
      id: "container-with-most-water",
      title: "Container With Most Water",
      difficulty: "Medium",
      category: "Two Pointers",
      solution: `function maxArea(height) {
    let l = 0, r = height.length - 1, res = 0;
    while (l < r) {
      const area = Math.min(height[l], height[r]) * (r - l);
      res = Math.max(res, area);
      if (height[l] < height[r]) l++;
      else r--;
    }
    return res;
  }`,
    },
    {
      id: "trapping-rain-water",
      title: "Trapping Rain Water",
      difficulty: "Hard",
      category: "Two Pointers",
      solution: `function trap(height) {
    let l = 0, r = height.length - 1;
    let leftMax = 0, rightMax = 0, res = 0;
    while (l < r) {
      if (height[l] < height[r]) {
        if (height[l] >= leftMax) leftMax = height[l];
        else res += leftMax - height[l];
        l++;
      } else {
        if (height[r] >= rightMax) rightMax = height[r];
        else res += rightMax - height[r];
        r--;
      }
    }
    return res;
  }`,

    },

    {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "Stack",
        solution: `function isValid(s) {
      const stack = [];
      const map = { ')':'(', ']':'[', '}':'{' };
      for (let c of s) {
        if (c in map) {
          if (stack.pop() !== map[c]) return false;
        } else stack.push(c);
      }
      return stack.length === 0;
    }`,
      },
      {
        id: "min-stack",
        title: "Min Stack",
        difficulty: "Medium",
        category: "Stack",
        solution: `class MinStack {
      constructor() {
        this.stack = [];
        this.minStack = [];
      }
      push(val) {
        this.stack.push(val);
        val = Math.min(val, this.minStack.length ? this.minStack[this.minStack.length - 1] : val);
        this.minStack.push(val);
      }
      pop() {
        this.stack.pop();
        this.minStack.pop();
      }
      top() {
        return this.stack[this.stack.length - 1];
      }
      getMin() {
        return this.minStack[this.minStack.length - 1];
      }
    }`,
      },
      {
        id: "evaluate-reverse-polish-notation",
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        category: "Stack",
        solution: `function evalRPN(tokens) {
      const stack = [];
      for (let t of tokens) {
        if (!isNaN(t)) stack.push(+t);
        else {
          const b = stack.pop();
          const a = stack.pop();
          switch (t) {
            case '+': stack.push(a + b); break;
            case '-': stack.push(a - b); break;
            case '*': stack.push(a * b); break;
            case '/': stack.push(Math.trunc(a / b)); break;
          }
        }
      }
      return stack[0];
    }`,
      },
      {
        id: "generate-parentheses",
        title: "Generate Parentheses",
        difficulty: "Medium",
        category: "Stack / Backtracking",
        solution: `function generateParenthesis(n) {
      const res = [];
      function backtrack(open, close, s) {
        if (s.length === n * 2) {
          res.push(s);
          return;
        }
        if (open < n) backtrack(open + 1, close, s + '(');
        if (close < open) backtrack(open, close + 1, s + ')');
      }
      backtrack(0, 0, '');
      return res;
    }`,
      },
      {
        id: "daily-temperatures",
        title: "Daily Temperatures",
        difficulty: "Medium",
        category: "Stack",
        solution: `function dailyTemperatures(temps) {
      const res = Array(temps.length).fill(0);
      const stack = [];
      for (let i = 0; i < temps.length; i++) {
        while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
          const idx = stack.pop();
          res[idx] = i - idx;
        }
        stack.push(i);
      }
      return res;
    }`,
      },
      {
        id: "car-fleet",
        title: "Car Fleet",
        difficulty: "Medium",
        category: "Stack / Sorting",
        solution: `function carFleet(target, position, speed) {
      const cars = position.map((p, i) => [p, (target - p) / speed[i]]);
      cars.sort((a, b) => b[0] - a[0]);
      let fleets = 0, curr = 0;
      for (let [_, time] of cars) {
        if (time > curr) {
          fleets++;
          curr = time;
        }
      }
      return fleets;
    }`,
      },
      {
        id: "largest-rectangle-in-histogram",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        category: "Stack",
        solution: `function largestRectangleArea(heights) {
      const stack = [];
      let maxArea = 0;
      heights.push(0);
      for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
          const h = heights[stack.pop()];
          const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
          maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
      }
      return maxArea;
    }`,
      },
      {
        id: "binary-search",
        title: "Binary Search",
        difficulty: "Easy",
        category: "Binary Search",
        solution: `function search(nums, target) {
      let l = 0, r = nums.length - 1;
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] === target) return m;
        if (nums[m] < target) l = m + 1;
        else r = m - 1;
      }
      return -1;
    }`,
      },
      {
        id: "search-a-2d-matrix",
        title: "Search a 2D Matrix",
        difficulty: "Medium",
        category: "Binary Search",
        solution: `function searchMatrix(matrix, target) {
      let rows = matrix.length, cols = matrix[0].length;
      let l = 0, r = rows * cols - 1;
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        const val = matrix[Math.floor(m / cols)][m % cols];
        if (val === target) return true;
        if (val < target) l = m + 1;
        else r = m - 1;
      }
      return false;
    }`,
      },
      {
        id: "koko-eating-bananas",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        category: "Binary Search",
        solution: `function minEatingSpeed(piles, h) {
      let l = 1, r = Math.max(...piles);
      while (l < r) {
        const m = Math.floor((l + r) / 2);
        let hours = 0;
        for (let p of piles) hours += Math.ceil(p / m);
        if (hours <= h) r = m;
        else l = m + 1;
      }
      return l;
    }`,
      },
      {
        id: "find-minimum-in-rotated-sorted-array",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        solution: `function findMin(nums) {
      let l = 0, r = nums.length - 1;
      while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
      }
      return nums[l];
    }`,
      },
      {
        id: "search-in-rotated-sorted-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        category: "Binary Search",
        solution: `function search(nums, target) {
      let l = 0, r = nums.length - 1;
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] === target) return m;
        if (nums[l] <= nums[m]) {
          if (target >= nums[l] && target < nums[m]) r = m - 1;
          else l = m + 1;
        } else {
          if (target <= nums[r] && target > nums[m]) l = m + 1;
          else r = m - 1;
        }
      }
      return -1;
    }`,
      },
      {
        id: "time-based-key-value-store",
        title: "Time Based Key-Value Store",
        difficulty: "Medium",
        category: "Binary Search / Design",
        solution: `class TimeMap {
      constructor() {
        this.map = {};
      }
      set(key, value, timestamp) {
        if (!this.map[key]) this.map[key] = [];
        this.map[key].push([timestamp, value]);
      }
      get(key, timestamp) {
        if (!this.map[key]) return "";
        let arr = this.map[key];
        let l = 0, r = arr.length - 1, res = "";
        while (l <= r) {
          const m = Math.floor((l + r) / 2);
          if (arr[m][0] <= timestamp) {
            res = arr[m][1];
            l = m + 1;
          } else r = m - 1;
        }
        return res;
      }
    }`,
      },
      {
        id: "median-of-two-sorted-arrays",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        category: "Binary Search",
        solution: `function findMedianSortedArrays(nums1, nums2) {
      const A = nums1.length < nums2.length ? nums1 : nums2;
      const B = nums1.length < nums2.length ? nums2 : nums1;
      const total = A.length + B.length;
      const half = Math.floor(total / 2);
    
      let l = 0, r = A.length - 1;
      while (true) {
        const i = Math.floor((l + r) / 2);
        const j = half - i - 2;
    
        const Aleft = i >= 0 ? A[i] : -Infinity;
        const Aright = i + 1 < A.length ? A[i + 1] : Infinity;
        const Bleft = j >= 0 ? B[j] : -Infinity;
        const Bright = j + 1 < B.length ? B[j + 1] : Infinity;
    
        if (Aleft <= Bright && Bleft <= Aright) {
          if (total % 2) return Math.min(Aright, Bright);
          return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
        } else if (Aleft > Bright) r = i - 1;
        else l = i + 1;
      }
    }`,
      },
      {
        id: "kth-largest-element-in-array",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        category: "Heap / Sorting",
        solution: `function findKthLargest(nums, k) {
      nums.sort((a,b)=>b-a);
      return nums[k-1];
    }`,
      },
      {
        id: "task-scheduler",
        title: "Task Scheduler",
        difficulty: "Medium",
        category: "Heap / Greedy",
        solution: `function leastInterval(tasks, n) {
      const count = {};
      for (let t of tasks) count[t] = (count[t] || 0) + 1;
      const max = Math.max(...Object.values(count));
      let maxCount = 0;
      for (let c of Object.values(count)) if (c === max) maxCount++;
      return Math.max(tasks.length, (max - 1) * (n + 1) + maxCount);
    }`,
      },
      {
        id: "design-twitter",
        title: "Design Twitter",
        difficulty: "Medium",
        category: "Heap / Design",
        solution: `class Twitter {
      constructor() {
        this.tweets = [];
        this.following = new Map();
      }
      postTweet(userId, tweetId) {
        this.tweets.unshift([userId, tweetId]);
      }
      getNewsFeed(userId) {
        const follows = this.following.get(userId) || new Set();
        follows.add(userId);
        return this.tweets
          .filter(([uid]) => follows.has(uid))
          .slice(0, 10)
          .map(([_, tid]) => tid);
      }
      follow(followerId, followeeId) {
        if (!this.following.has(followerId))
          this.following.set(followerId, new Set());
        this.following.get(followerId).add(followeeId);
      }
      unfollow(followerId, followeeId) {
        this.following.get(followerId)?.delete(followeeId);
      }
    }`,
      },
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        category: "Linked List",
        solution: `function reverseList(head) {
      let prev = null, curr = head;
      while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }
      return prev;
    }`,
      },
      {
        id: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        category: "Linked List",
        solution: `function mergeTwoLists(l1, l2) {
      const dummy = new ListNode(0);
      let tail = dummy;
      while (l1 && l2) {
        if (l1.val < l2.val) {
          tail.next = l1;
          l1 = l1.next;
        } else {
          tail.next = l2;
          l2 = l2.next;
        }
        tail = tail.next;
      }
      tail.next = l1 || l2;
      return dummy.next;
    }`,
      },
      {
        id: "reorder-list",
        title: "Reorder List",
        difficulty: "Medium",
        category: "Linked List",
        solution: `function reorderList(head) {
      if (!head) return null;
      // Find middle
      let slow = head, fast = head;
      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      // Reverse second half
      let prev = null, curr = slow.next;
      slow.next = null;
      while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }
      // Merge halves
      let first = head, second = prev;
      while (second) {
        let tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
      }
    }`,
      },
      {
        id: "remove-nth-node-from-end",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        category: "Linked List",
        solution: `function removeNthFromEnd(head, n) {
      const dummy = new ListNode(0, head);
      let first = dummy, second = dummy;
      for (let i = 0; i <= n; i++) first = first.next;
      while (first) {
        first = first.next;
        second = second.next;
      }
      second.next = second.next.next;
      return dummy.next;
    }`,
      },
      {
        id: "copy-list-with-random-pointer",
        title: "Copy List with Random Pointer",
        difficulty: "Medium",
        category: "Linked List",
        solution: `function copyRandomList(head) {
      if (!head) return null;
      const map = new Map();
      let curr = head;
      while (curr) {
        map.set(curr, new Node(curr.val));
        curr = curr.next;
      }
      curr = head;
      while (curr) {
        map.get(curr).next = map.get(curr.next) || null;
        map.get(curr).random = map.get(curr.random) || null;
        curr = curr.next;
      }
      return map.get(head);
    }`,
      },
      {
        id: "add-two-numbers",
        title: "Add Two Numbers",
        difficulty: "Medium",
        category: "Linked List",
        solution: `function addTwoNumbers(l1, l2) {
      const dummy = new ListNode(0);
      let curr = dummy, carry = 0;
      while (l1 || l2 || carry) {
        let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1?.next || null;
        l2 = l2?.next || null;
      }
      return dummy.next;
    }`,
      },
      {
        id: "linked-list-cycle",
        title: "Linked List Cycle",
        difficulty: "Easy",
        category: "Linked List",
        solution: `function hasCycle(head) {
      let slow = head, fast = head;
      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
      }
      return false;
    }`,
      },
      {
        id: "find-the-duplicate-number",
        title: "Find the Duplicate Number",
        difficulty: "Medium",
        category: "Linked List / Floyd's Algorithm",
        solution: `function findDuplicate(nums) {
      let slow = nums[0], fast = nums[0];
      do {
        slow = nums[slow];
        fast = nums[nums[fast]];
      } while (slow !== fast);
      slow = nums[0];
      while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
      }
      return slow;
    }`,
      },
      {
        id: "lru-cache",
        title: "LRU Cache",
        difficulty: "Medium",
        category: "Linked List / Design",
        solution: `class LRUCache {
      constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
      }
      get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
      }
      put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
          this.map.delete(this.map.keys().next().value);
        }
      }
    }`,
      },
      {
        id: "merge-k-sorted-lists",
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        category: "Linked List / Divide & Conquer",
        solution: `function mergeKLists(lists) {
      if (!lists.length) return null;
      function merge(l1, l2) {
        const dummy = new ListNode(0);
        let curr = dummy;
        while (l1 && l2) {
          if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
          } else {
            curr.next = l2;
            l2 = l2.next;
          }
          curr = curr.next;
        }
        curr.next = l1 || l2;
        return dummy.next;
      }
      while (lists.length > 1) {
        const merged = [];
        for (let i = 0; i < lists.length; i += 2) {
          merged.push(merge(lists[i], lists[i + 1] || null));
        }
        lists = merged;
      }
      return lists[0];
    }`,
      },
      {
        id: "invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        category: "Binary Tree",
        solution: `function invertTree(root) {
      if (!root) return null;
      [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
      return root;
    }`,
      },
      {
        id: "maximum-depth-of-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        category: "Binary Tree",
        solution: `function maxDepth(root) {
      if (!root) return 0;
      return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }`,
      },
      {
        id: "diameter-of-binary-tree",
        title: "Diameter of Binary Tree",
        difficulty: "Easy",
        category: "Binary Tree",
        solution: `function diameterOfBinaryTree(root) {
      let res = 0;
      function dfs(node) {
        if (!node) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        res = Math.max(res, left + right);
        return 1 + Math.max(left, right);
      }
      dfs(root);
      return res;
    }`,
      },
      {
        id: "balanced-binary-tree",
        title: "Balanced Binary Tree",
        difficulty: "Easy",
        category: "Binary Tree",
        solution: `function isBalanced(root) {
      function dfs(node) {
        if (!node) return [true, 0];
        const [leftBal, leftH] = dfs(node.left);
        const [rightBal, rightH] = dfs(node.right);
        const balanced = leftBal && rightBal && Math.abs(leftH - rightH) <= 1;
        return [balanced, 1 + Math.max(leftH, rightH)];
      }
      return dfs(root)[0];
    }`,
      },
      {
        id: "same-tree",
        title: "Same Tree",
        difficulty: "Easy",
        category: "Binary Tree",
        solution: `function isSameTree(p, q) {
      if (!p && !q) return true;
      if (!p || !q || p.val !== q.val) return false;
      return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }`,
      },
      {
        id: "subtree-of-another-tree",
        title: "Subtree of Another Tree",
        difficulty: "Easy",
        category: "Binary Tree",
        solution: `function isSubtree(root, subRoot) {
      if (!root) return false;
      if (isSame(root, subRoot)) return true;
      return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
      function isSame(a, b) {
        if (!a && !b) return true;
        if (!a || !b || a.val !== b.val) return false;
        return isSame(a.left, b.left) && isSame(a.right, b.right);
      }
    }`,
      },
      {
        id: "lowest-common-ancestor-of-bst",
        title: "Lowest Common Ancestor of a BST",
        difficulty: "Medium",
        category: "Binary Tree / BST",
        solution: `function lowestCommonAncestor(root, p, q) {
      while (root) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
      }
    }`,
      },
      {
        id: "binary-tree-level-order-traversal",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        category: "Binary Tree / BFS",
        solution: `function levelOrder(root) {
      if (!root) return [];
      const q = [root], res = [];
      while (q.length) {
        const len = q.length, level = [];
        for (let i = 0; i < len; i++) {
          const node = q.shift();
          level.push(node.val);
          if (node.left) q.push(node.left);
          if (node.right) q.push(node.right);
        }
        res.push(level);
      }
      return res;
    }`,
      },
      {
        id: "binary-tree-right-side-view",
        title: "Binary Tree Right Side View",
        difficulty: "Medium",
        category: "Binary Tree / BFS",
        solution: `function rightSideView(root) {
      if (!root) return [];
      const q = [root], res = [];
      while (q.length) {
        const len = q.length;
        for (let i = 0; i < len; i++) {
          const node = q.shift();
          if (i === len - 1) res.push(node.val);
          if (node.left) q.push(node.left);
          if (node.right) q.push(node.right);
        }
      }
      return res;
    }`,
      },

      {
        id: "count-good-nodes-in-binary-tree",
        title: "Count Good Nodes in Binary Tree",
        difficulty: "Medium",
        category: "Binary Tree",
        solution: `function goodNodes(root) {
      let res = 0;
      function dfs(node, maxVal) {
        if (!node) return;
        if (node.val >= maxVal) res++;
        dfs(node.left, Math.max(maxVal, node.val));
        dfs(node.right, Math.max(maxVal, node.val));
      }
      dfs(root, -Infinity);
      return res;
    }`,
      },
      {
        id: "validate-binary-search-tree",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        category: "Binary Search Tree",
        solution: `function isValidBST(root) {
      function dfs(node, min, max) {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;
        return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
      }
      return dfs(root, -Infinity, Infinity);
    }`,
      },
      {
        id: "kth-smallest-element-in-bst",
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        category: "Binary Search Tree",
        solution: `function kthSmallest(root, k) {
      const stack = [];
      while (true) {
        while (root) {
          stack.push(root);
          root = root.left;
        }
        root = stack.pop();
        if (--k === 0) return root.val;
        root = root.right;
      }
    }`,
      },
      {
        id: "construct-binary-tree-from-preorder-and-inorder-traversal",
        title: "Construct Binary Tree from Preorder and Inorder Traversal",
        difficulty: "Medium",
        category: "Binary Tree / Construction",
        solution: `function buildTree(preorder, inorder) {
      const map = new Map();
      inorder.forEach((v, i) => map.set(v, i));
      let i = 0;
      function helper(l, r) {
        if (l > r) return null;
        const root = new TreeNode(preorder[i++]);
        root.left = helper(l, map.get(root.val) - 1);
        root.right = helper(map.get(root.val) + 1, r);
        return root;
      }
      return helper(0, inorder.length - 1);
    }`,
      },
      {
        id: "binary-tree-maximum-path-sum",
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        category: "Binary Tree",
        solution: `function maxPathSum(root) {
      let res = -Infinity;
      function dfs(node) {
        if (!node) return 0;
        const left = Math.max(dfs(node.left), 0);
        const right = Math.max(dfs(node.right), 0);
        res = Math.max(res, node.val + left + right);
        return node.val + Math.max(left, right);
      }
      dfs(root);
      return res;
    }`,
      },
      {
        id: "serialize-and-deserialize-binary-tree",
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        category: "Binary Tree / Design",
        solution: `function serialize(root) {
      const res = [];
      function dfs(node) {
        if (!node) { res.push("N"); return; }
        res.push(node.val);
        dfs(node.left);
        dfs(node.right);
      }
      dfs(root);
      return res.join(",");
    }
    function deserialize(data) {
      const vals = data.split(",");
      function build() {
        const val = vals.shift();
        if (val === "N") return null;
        const node = new TreeNode(+val);
        node.left = build();
        node.right = build();
        return node;
      }
      return build();
    }`,
      },
      {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        category: "Graph / DFS",
        solution: `function numIslands(grid) {
      const rows = grid.length, cols = grid[0].length;
      let count = 0;
      const visit = new Set();
      function dfs(r, c) {
        if (r<0 || c<0 || r>=rows || c>=cols || grid[r][c]==='0' || visit.has(r+','+c)) return;
        visit.add(r+','+c);
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
      }
      for (let r=0;r<rows;r++) {
        for (let c=0;c<cols;c++) {
          if (grid[r][c]==='1' && !visit.has(r+','+c)) {
            count++; dfs(r,c);
          }
        }
      }
      return count;
    }`,
      },
      {
        id: "clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        category: "Graph / DFS",
        solution: `function cloneGraph(node) {
      if (!node) return null;
      const map = new Map();
      function dfs(n) {
        if (map.has(n)) return map.get(n);
        const copy = new Node(n.val);
        map.set(n, copy);
        for (let nei of n.neighbors) copy.neighbors.push(dfs(nei));
        return copy;
      }
      return dfs(node);
    }`,
      },
      {
        id: "max-area-of-island",
        title: "Max Area of Island",
        difficulty: "Medium",
        category: "Graph / DFS",
        solution: `function maxAreaOfIsland(grid) {
      const rows = grid.length, cols = grid[0].length;
      let maxArea = 0;
      const seen = new Set();
      function dfs(r,c) {
        if (r<0||c<0||r>=rows||c>=cols||grid[r][c]===0||seen.has(r+','+c)) return 0;
        seen.add(r+','+c);
        return 1+dfs(r+1,c)+dfs(r-1,c)+dfs(r,c+1)+dfs(r,c-1);
      }
      for (let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          maxArea = Math.max(maxArea, dfs(r,c));
        }
      }
      return maxArea;
    }`,
      },
      {
        id: "pacific-atlantic-water-flow",
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        category: "Graph / DFS",
        solution: `function pacificAtlantic(heights) {
      const rows = heights.length, cols = heights[0].length;
      const pac = new Set(), atl = new Set();
      function dfs(r,c,visit,prev) {
        if (r<0||c<0||r>=rows||c>=cols||heights[r][c]<prev||visit.has(r+','+c)) return;
        visit.add(r+','+c);
        dfs(r+1,c,visit,heights[r][c]);
        dfs(r-1,c,visit,heights[r][c]);
        dfs(r,c+1,visit,heights[r][c]);
        dfs(r,c-1,visit,heights[r][c]);
      }
      for(let r=0;r<rows;r++){ dfs(r,0,pac,-Infinity); dfs(r,cols-1,atl,-Infinity); }
      for(let c=0;c<cols;c++){ dfs(0,c,pac,-Infinity); dfs(rows-1,c,atl,-Infinity); }
      const res=[];
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          if(pac.has(r+','+c)&&atl.has(r+','+c)) res.push([r,c]);
        }
      }
      return res;
    }`,
      },
      {
        id: "surrounded-regions",
        title: "Surrounded Regions",
        difficulty: "Medium",
        category: "Graph / DFS",
        solution: `function solve(board) {
      const rows = board.length, cols = board[0].length;
      function dfs(r,c){
        if(r<0||c<0||r>=rows||c>=cols||board[r][c]!=='O')return;
        board[r][c]='T';
        dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);
      }
      for(let r=0;r<rows;r++){ dfs(r,0); dfs(r,cols-1); }
      for(let c=0;c<cols;c++){ dfs(0,c); dfs(rows-1,c); }
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          if(board[r][c]==='O') board[r][c]='X';
          if(board[r][c]==='T') board[r][c]='O';
        }
      }
    }`,
      },
      {
        id: "rotting-oranges",
        title: "Rotting Oranges",
        difficulty: "Medium",
        category: "Graph / BFS",
        solution: `function orangesRotting(grid) {
      const rows=grid.length,cols=grid[0].length;
      const q=[];
      let fresh=0,time=0;
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          if(grid[r][c]===2) q.push([r,c]);
          if(grid[r][c]===1) fresh++;
        }
      }
      const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
      while(q.length&&fresh){
        const len=q.length;
        for(let i=0;i<len;i++){
          const [r,c]=q.shift();
          for(let [dr,dc] of dirs){
            const nr=r+dr,nc=c+dc;
            if(nr>=0&&nc>=0&&nr<rows&&nc<cols&&grid[nr][nc]===1){
              grid[nr][nc]=2;
              q.push([nr,nc]);
              fresh--;
            }
          }
        }
        time++;
      }
      return fresh? -1 : time;
    }`,
      },
      {
        id: "course-schedule",
        title: "Course Schedule",
        difficulty: "Medium",
        category: "Graph / Topological Sort",
        solution: `function canFinish(numCourses, prerequisites) {
      const pre = new Map();
      for (let [a,b] of prerequisites) {
        if (!pre.has(a)) pre.set(a, []);
        pre.get(a).push(b);
      }
      const visit = new Set(), cycle = new Set();
      function dfs(c) {
        if (cycle.has(c)) return false;
        if (visit.has(c)) return true;
        cycle.add(c);
        for (let preq of pre.get(c) || []) {
          if (!dfs(preq)) return false;
        }
        cycle.delete(c);
        visit.add(c);
        return true;
      }
      for (let i=0;i<numCourses;i++){
        if(!dfs(i)) return false;
      }
      return true;
    }`,
      },
      {
        id: "course-schedule-ii",
        title: "Course Schedule II",
        difficulty: "Medium",
        category: "Graph / Topological Sort",
        solution: `function findOrder(numCourses, prerequisites) {
      const pre = new Map();
      for (let [a,b] of prerequisites) {
        if (!pre.has(a)) pre.set(a, []);
        pre.get(a).push(b);
      }
      const visit = new Set(), cycle = new Set(), res = [];
      function dfs(c) {
        if (cycle.has(c)) return false;
        if (visit.has(c)) return true;
        cycle.add(c);
        for (let preq of pre.get(c) || []) {
          if (!dfs(preq)) return false;
        }
        cycle.delete(c);
        visit.add(c);
        res.push(c);
        return true;
      }
      for (let i=0;i<numCourses;i++){
        if(!dfs(i)) return [];
      }
      return res;
    }`,
      },
      {
        id: "graph-valid-tree",
        title: "Graph Valid Tree",
        difficulty: "Medium",
        category: "Graph / Union Find",
        solution: `function validTree(n, edges) {
      const parent = Array(n).fill(0).map((_,i)=>i);
      function find(x){ if(parent[x]!==x) parent[x]=find(parent[x]); return parent[x]; }
      function union(x,y){
        const px=find(x),py=find(y);
        if(px===py) return false;
        parent[px]=py;
        return true;
      }
      for(let [a,b] of edges){
        if(!union(a,b)) return false;
      }
      return edges.length===n-1;
    }`,
      },
      {
        id: "number-of-connected-components-in-undirected-graph",
        title: "Number of Connected Components in an Undirected Graph",
        difficulty: "Medium",
        category: "Graph / Union Find",
        solution: `function countComponents(n, edges) {
      const parent = Array(n).fill(0).map((_,i)=>i);
      function find(x){ if(parent[x]!==x) parent[x]=find(parent[x]); return parent[x]; }
      function union(x,y){
        const px=find(x),py=find(y);
        if(px!==py) parent[px]=py;
      }
      for(let [a,b] of edges){ union(a,b); }
      const comps=new Set();
      for(let i=0;i<n;i++) comps.add(find(i));
      return comps.size;
    }`,
      },

      {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        category: "DP",
        solution: `function climbStairs(n) {
      if (n <= 2) return n;
      let a = 1, b = 2;
      for (let i = 3; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
      }
      return b;
    }`,
      },
      {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        category: "DP",
        solution: `function rob(nums) {
      let rob1 = 0, rob2 = 0;
      for (let n of nums) {
        const temp = Math.max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
      }
      return rob2;
    }`,
      },
      {
        id: "house-robber-ii",
        title: "House Robber II",
        difficulty: "Medium",
        category: "DP",
        solution: `function rob(nums) {
      if (nums.length === 1) return nums[0];
      const helper = (arr) => {
        let rob1 = 0, rob2 = 0;
        for (let n of arr) {
          const temp = Math.max(n + rob1, rob2);
          rob1 = rob2;
          rob2 = temp;
        }
        return rob2;
      };
      return Math.max(helper(nums.slice(1)), helper(nums.slice(0, -1)));
    }`,
      },
      {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        category: "DP / Two Pointers",
        solution: `function longestPalindrome(s) {
      let res = "", resLen = 0;
      function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
          if (r - l + 1 > resLen) {
            res = s.slice(l, r + 1);
            resLen = r - l + 1;
          }
          l--; r++;
        }
      }
      for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
      }
      return res;
    }`,
      },
      {
        id: "palindromic-substrings",
        title: "Palindromic Substrings",
        difficulty: "Medium",
        category: "DP",
        solution: `function countSubstrings(s) {
      let count = 0;
      function expand(l, r) {
        while (l>=0 && r<s.length && s[l]===s[r]) {
          count++; l--; r++;
        }
      }
      for (let i=0;i<s.length;i++){
        expand(i,i);
        expand(i,i+1);
      }
      return count;
    }`,
      },
      {
        id: "decode-ways",
        title: "Decode Ways",
        difficulty: "Medium",
        category: "DP",
        solution: `function numDecodings(s) {
      if (s[0] === "0") return 0;
      let dp1 = 1, dp2 = 1;
      for (let i = 1; i < s.length; i++) {
        let temp = 0;
        if (s[i] !== "0") temp = dp2;
        const two = s.slice(i-1, i+1);
        if (two >= "10" && two <= "26") temp += dp1;
        dp1 = dp2;
        dp2 = temp;
        if (dp2 === 0) return 0;
      }
      return dp2;
    }`,
      },
      {
        id: "unique-paths",
        title: "Unique Paths",
        difficulty: "Medium",
        category: "DP",
        solution: `function uniquePaths(m, n) {
      const dp = Array(n).fill(1);
      for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
          dp[j] += dp[j - 1];
        }
      }
      return dp[n - 1];
    }`,
      },
      {
        id: "unique-paths-ii",
        title: "Unique Paths II",
        difficulty: "Medium",
        category: "DP",
        solution: `function uniquePathsWithObstacles(obs) {
      const m = obs.length, n = obs[0].length;
      const dp = Array(n).fill(0);
      dp[0] = obs[0][0] === 1 ? 0 : 1;
      for (let i=0;i<m;i++){
        for (let j=0;j<n;j++){
          if (obs[i][j] === 1) dp[j] = 0;
          else if (j>0) dp[j] += dp[j-1];
        }
      }
      return dp[n-1];
    }`,
      },
      {
        id: "min-cost-climbing-stairs",
        title: "Min Cost Climbing Stairs",
        difficulty: "Easy",
        category: "DP",
        solution: `function minCostClimbingStairs(cost) {
      let a = 0, b = 0;
      for (let i = 2; i <= cost.length; i++) {
        let temp = Math.min(a + cost[i - 1], b + cost[i - 2]);
        a = b;
        b = temp;
      }
      return b;
    }`,
      },
      {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        category: "DP",
        solution: `function coinChange(coins, amount) {
      const dp = Array(amount + 1).fill(Infinity);
      dp[0] = 0;
      for (let c of coins) {
        for (let i = c; i <= amount; i++) {
          dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
      }
      return dp[amount] === Infinity ? -1 : dp[amount];
    }`,
      },
      {
        id: "coin-change-ii",
        title: "Coin Change II",
        difficulty: "Medium",
        category: "DP",
        solution: `function change(amount, coins) {
      const dp = Array(amount + 1).fill(0);
      dp[0] = 1;
      for (let c of coins) {
        for (let i = c; i <= amount; i++) {
          dp[i] += dp[i - c];
        }
      }
      return dp[amount];
    }`,
      },
      {
        id: "target-sum",
        title: "Target Sum",
        difficulty: "Medium",
        category: "DP / Backtracking",
        solution: `function findTargetSumWays(nums, target) {
      const memo = new Map();
      function dfs(i, total) {
        const key = i + ',' + total;
        if (memo.has(key)) return memo.get(key);
        if (i === nums.length) return total === target ? 1 : 0;
        const ways = dfs(i + 1, total + nums[i]) + dfs(i + 1, total - nums[i]);
        memo.set(key, ways);
        return ways;
      }
      return dfs(0, 0);
    }`,
      },
      {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        category: "DP / Binary Search",
        solution: `function lengthOfLIS(nums) {
      const res = [];
      for (let n of nums) {
        let l = 0, r = res.length;
        while (l < r) {
          const m = (l + r) >> 1;
          if (res[m] < n) l = m + 1;
          else r = m;
        }
        res[l] = n;
      }
      return res.length;
    }`,
      },
      {
        id: "partition-equal-subset-sum",
        title: "Partition Equal Subset Sum",
        difficulty: "Medium",
        category: "DP",
        solution: `function canPartition(nums) {
      const sum = nums.reduce((a,b)=>a+b,0);
      if (sum % 2 !== 0) return false;
      const target = sum / 2;
      const dp = new Set([0]);
      for (let n of nums) {
        const newVals = new Set();
        for (let v of dp) {
          if (v + n === target) return true;
          if (v + n < target) newVals.add(v + n);
        }
        for (let v of newVals) dp.add(v);
      }
      return dp.has(target);
    }`,
      },
      {
        id: "minimum-window-subsequence",
        title: "Minimum Window Subsequence",
        difficulty: "Hard",
        category: "DP",
        solution: `function minWindow(S, T) {
      const n = S.length, m = T.length;
      let start = -1, minLen = Infinity;
      for (let i = 0; i < n; i++) {
        if (S[i] !== T[0]) continue;
        let s = i, t = 0;
        while (s < n && t < m) {
          if (S[s] === T[t]) t++;
          s++;
        }
        if (t === m) {
          let end = s - 1;
          t = m - 1;
          while (i <= end) {
            if (S[end] === T[t]) t--;
            if (t < 0) break;
            end--;
          }
          if (end - i + 1 < minLen) {
            minLen = end - i + 1;
            start = i;
          }
        }
      }
      return start === -1 ? "" : S.slice(start, start + minLen);
    }`,
      },
      {
        id: "non-overlapping-intervals",
        title: "Non-Overlapping Intervals",
        difficulty: "Medium",
        category: "Intervals",
        solution: `function eraseOverlapIntervals(intervals) {
      intervals.sort((a,b)=>a[1]-b[1]);
      let res = 0;
      let end = intervals[0][1];
      for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) res++;
        else end = intervals[i][1];
      }
      return res;
    }`,
      },
      {
        id: "insert-interval",
        title: "Insert Interval",
        difficulty: "Medium",
        category: "Intervals",
        solution: `function insert(intervals, newInt) {
      const res = [];
      for (let i=0;i<intervals.length;i++){
        if (newInt[1] < intervals[i][0]) {
          res.push(newInt, ...intervals.slice(i));
          return res;
        }
        if (newInt[0] > intervals[i][1]) {
          res.push(intervals[i]);
        } else {
          newInt = [
            Math.min(newInt[0], intervals[i][0]),
            Math.max(newInt[1], intervals[i][1])
          ];
        }
      }
      res.push(newInt);
      return res;
    }`,
      },
      {
        id: "merge-intervals",
        title: "Merge Intervals",
        difficulty: "Medium",
        category: "Intervals",
        solution: `function merge(intervals) {
      intervals.sort((a,b)=>a[0]-b[0]);
      const res = [intervals[0]];
      for (let i=1;i<intervals.length;i++){
        const last = res[res.length-1];
        if (intervals[i][0] <= last[1]) {
          last[1] = Math.max(last[1], intervals[i][1]);
        } else {
          res.push(intervals[i]);
        }
      }
      return res;
    }`,
      },
      {
        id: "meeting-rooms",
        title: "Meeting Rooms",
        difficulty: "Easy",
        category: "Intervals",
        solution: `function canAttendMeetings(intervals) {
      intervals.sort((a,b)=>a[0]-b[0]);
      for (let i=1;i<intervals.length;i++){
        if (intervals[i][0] < intervals[i-1][1]) return false;
      }
      return true;
    }`,
      },
      {
        id: "meeting-rooms-ii",
        title: "Meeting Rooms II",
        difficulty: "Medium",
        category: "Intervals",
        solution: `function minMeetingRooms(intervals) {
      if (!intervals.length) return 0;
      const starts = intervals.map(i=>i[0]).sort((a,b)=>a-b);
      const ends = intervals.map(i=>i[1]).sort((a,b)=>a-b);
      let s = 0, e = 0, rooms = 0;
      while (s < intervals.length) {
        if (starts[s] < ends[e]) {
          rooms++;
          s++;
        } else {
          e++;
          s++;
        }
      }
      return rooms;
    }`,
      },
    
    ];
    
    
    
    
    

  
  