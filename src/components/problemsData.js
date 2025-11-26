// Supported languages
export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "JS" },
  { id: "python", name: "Python", icon: "PY" },
  { id: "java", name: "Java", icon: "JV" },
  { id: "cpp", name: "C++", icon: "C++" },
];

export const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}`,
      python: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int diff = target - nums[i];
        if (map.containsKey(diff)) {
            return new int[] { map.get(diff), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (map.count(diff)) {
            return {map[diff], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`,
    },
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let ch of s) count[ch] = (count[ch] || 0) + 1;
  for (let ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}`,
      python: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for ch in s:
        count[ch] = count.get(ch, 0) + 1
    for ch in t:
        if ch not in count or count[ch] == 0:
            return False
        count[ch] -= 1
    return True`,
      java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (char c : t.toCharArray()) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}`,
      cpp: `bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    vector<int> count(26, 0);
    for (char c : s) count[c - 'a']++;
    for (char c : t) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}`,
    },
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function containsDuplicate(nums) {
  const set = new Set();
  for (let n of nums) {
    if (set.has(n)) return true;
    set.add(n);
  }
  return false;
}`,
      python: `def containsDuplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False`,
      java: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) {
        if (set.contains(n)) return true;
        set.add(n);
    }
    return false;
}`,
      cpp: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    for (int n : nums) {
        if (seen.count(n)) return true;
        seen.insert(n);
    }
    return false;
}`,
    },
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function groupAnagrams(strs) {
  const map = new Map();
  for (let s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`,
      python: `def groupAnagrams(strs):
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())`,
      java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] arr = s.toCharArray();
        Arrays.sort(arr);
        String key = new String(arr);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}`,
      cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> map;
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        map[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& p : map) res.push_back(p.second);
    return res;
}`,
    },
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function topKFrequent(nums, k) {
  const count = {};
  for (let n of nums) count[n] = (count[n] || 0) + 1;
  return Object.entries(count)
    .sort((a,b) => b[1] - a[1])
    .slice(0, k)
    .map(x => +x[0]);
}`,
      python: `def topKFrequent(nums, k):
    from collections import Counter
    count = Counter(nums)
    return [x[0] for x in count.most_common(k)]`,
      java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) {
        count.put(n, count.getOrDefault(n, 0) + 1);
    }
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> b[1] - a[1]);
    for (var e : count.entrySet()) {
        pq.offer(new int[] {e.getKey(), e.getValue()});
    }
    int[] res = new int[k];
    for (int i = 0; i < k; i++) res[i] = pq.poll()[0];
    return res;
}`,
      cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int n : nums) count[n]++;
    vector<pair<int,int>> freq;
    for (auto& p : count) freq.push_back({p.second, p.first});
    sort(freq.rbegin(), freq.rend());
    vector<int> res;
    for (int i = 0; i < k; i++) res.push_back(freq[i].second);
    return res;
}`,
    },
  },
  {
    id: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function productExceptSelf(nums) {
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
      python: `def productExceptSelf(nums):
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
      java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    Arrays.fill(res, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}`,
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}`,
    },
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function longestConsecutive(nums) {
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
      python: `def longestConsecutive(nums):
    numSet = set(nums)
    longest = 0
    for n in nums:
        if n - 1 not in numSet:
            length = 1
            while n + length in numSet:
                length += 1
            longest = max(longest, length)
    return longest`,
      java: `public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);
    int longest = 0;
    for (int n : nums) {
        if (!set.contains(n - 1)) {
            int length = 1;
            while (set.contains(n + length)) length++;
            longest = Math.max(longest, length);
        }
    }
    return longest;
}`,
      cpp: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int longest = 0;
    for (int n : nums) {
        if (!s.count(n - 1)) {
            int length = 1;
            while (s.count(n + length)) length++;
            longest = max(longest, length);
        }
    }
    return longest;
}`,
    },
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    solutions: {
      javascript: `function isPalindrome(s) {
  s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++; r--;
  }
  return true;
}`,
      python: `def isPalindrome(s):
    s = ''.join(c.lower() for c in s if c.isalnum())
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]:
            return False
        l += 1
        r -= 1
    return True`,
      java: `public boolean isPalindrome(String s) {
    s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s.charAt(l) != s.charAt(r)) return false;
        l++; r--;
    }
    return true;
}`,
      cpp: `bool isPalindrome(string s) {
    string clean;
    for (char c : s) {
        if (isalnum(c)) clean += tolower(c);
    }
    int l = 0, r = clean.size() - 1;
    while (l < r) {
        if (clean[l++] != clean[r--]) return false;
    }
    return true;
}`,
    },
  },
  {
    id: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    solutions: {
      javascript: `function threeSum(nums) {
  nums.sort((a,b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let l = i + 1, r = nums.length - 1;
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
      python: `def threeSum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif total < 0: l += 1
            else: r -= 1
    return res`,
      java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i + 1, r = nums.length - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for (int i = 0; i < nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i + 1, r = nums.size() - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
    },
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    solutions: {
      javascript: `function maxArea(height) {
  let l = 0, r = height.length - 1, res = 0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    res = Math.max(res, area);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return res;
}`,
      python: `def maxArea(height):
    l, r = 0, len(height) - 1
    res = 0
    while l < r:
        area = min(height[l], height[r]) * (r - l)
        res = max(res, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return res`,
      java: `public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, res = 0;
    while (l < r) {
        int area = Math.min(height[l], height[r]) * (r - l);
        res = Math.max(res, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return res;
}`,
      cpp: `int maxArea(vector<int>& height) {
    int l = 0, r = height.size() - 1, res = 0;
    while (l < r) {
        int area = min(height[l], height[r]) * (r - l);
        res = max(res, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return res;
}`,
    },
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    solutions: {
      javascript: `function trap(height) {
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
      python: `def trap(height):
    l, r = 0, len(height) - 1
    leftMax, rightMax, res = 0, 0, 0
    while l < r:
        if height[l] < height[r]:
            if height[l] >= leftMax:
                leftMax = height[l]
            else:
                res += leftMax - height[l]
            l += 1
        else:
            if height[r] >= rightMax:
                rightMax = height[r]
            else:
                res += rightMax - height[r]
            r -= 1
    return res`,
      java: `public int trap(int[] height) {
    int l = 0, r = height.length - 1;
    int leftMax = 0, rightMax = 0, res = 0;
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
      cpp: `int trap(vector<int>& height) {
    int l = 0, r = height.size() - 1;
    int leftMax = 0, rightMax = 0, res = 0;
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
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    solutions: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')':'(', ']':'[', '}':'{' };
  for (let c of s) {
    if (c in map) {
      if (stack.pop() !== map[c]) return false;
    } else stack.push(c);
  }
  return stack.length === 0;
}`,
      python: `def isValid(s):
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in mapping:
            if not stack or stack.pop() != mapping[c]:
                return False
        else:
            stack.append(c)
    return len(stack) == 0`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = Map.of(')', '(', ']', '[', '}', '{');
    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != map.get(c)) return false;
        } else stack.push(c);
    }
    return stack.isEmpty();
}`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> map = {{')', '('}, {']', '['}, {'}', '{'}};
    for (char c : s) {
        if (map.count(c)) {
            if (st.empty() || st.top() != map[c]) return false;
            st.pop();
        } else st.push(c);
    }
    return st.empty();
}`,
    },
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    solutions: {
      javascript: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      python: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            return m
        if nums[m] < target:
            l = m + 1
        else:
            r = m - 1
    return -1`,
      java: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
        if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
        if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
    },
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    solutions: {
      javascript: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      python: `def reverseList(head):
    prev, curr = None, head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    },
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    solutions: {
      javascript: `function mergeTwoLists(l1, l2) {
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
      python: `def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`,
      java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = l1 != null ? l1 : l2;
    return dummy.next;
}`,
      cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val < l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
    },
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List",
    solutions: {
      javascript: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      python: `def hasCycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      cpp: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    },
  },
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Binary Tree",
    solutions: {
      javascript: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
      python: `def invertTree(root):
    if not root:
        return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
      java: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
      cpp: `TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    TreeNode* temp = root->left;
    root->left = invertTree(root->right);
    root->right = invertTree(temp);
    return root;
}`,
    },
  },
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Binary Tree",
    solutions: {
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      python: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
      java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      cpp: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
    },
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "DP",
    solutions: {
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`,
      python: `def climbStairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for i in range(3, n + 1):
        a, b = b, a + b
    return b`,
      java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
    },
  },
  {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "DP",
    solutions: {
      javascript: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (let n of nums) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}`,
      python: `def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        rob1, rob2 = rob2, max(n + rob1, rob2)
    return rob2`,
      java: `public int rob(int[] nums) {
    int rob1 = 0, rob2 = 0;
    for (int n : nums) {
        int temp = Math.max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,
      cpp: `int rob(vector<int>& nums) {
    int rob1 = 0, rob2 = 0;
    for (int n : nums) {
        int temp = max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,
    },
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "DP",
    solutions: {
      javascript: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let c of coins) {
    for (let i = c; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for c in coins:
        for i in range(c, amount + 1):
            dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int c : coins) {
        for (int i = c; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int c : coins) {
        for (int i = c; i <= amount; i++) {
            dp[i] = min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    },
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph / DFS",
    solutions: {
      javascript: `function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `def numIslands(grid):
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
      java: `public int numIslands(char[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int count = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}

void dfs(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}`,
      cpp: `int numIslands(vector<vector<char>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    int count = 0;
    function<void(int, int)> dfs = [&](int r, int c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`,
    },
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    solutions: {
      javascript: `function lengthOfLongestSubstring(s) {
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
      python: `def lengthOfLongestSubstring(s):
    seen = set()
    l, res = 0, 0
    for r in range(len(s)):
        while s[r] in seen:
            seen.remove(s[l])
            l += 1
        seen.add(s[r])
        res = max(res, r - l + 1)
    return res`,
      java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int l = 0, res = 0;
    for (int r = 0; r < s.length(); r++) {
        while (set.contains(s.charAt(r))) {
            set.remove(s.charAt(l));
            l++;
        }
        set.add(s.charAt(r));
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
      cpp: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int l = 0, res = 0;
    for (int r = 0; r < s.size(); r++) {
        while (seen.count(s[r])) {
            seen.erase(s[l]);
            l++;
        }
        seen.insert(s[r]);
        res = max(res, r - l + 1);
    }
    return res;
}`,
    },
  },
  {
    id: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    solutions: {
      javascript: `class MinStack {
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
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(val)
    
    def pop(self):
        self.stack.pop()
        self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]`,
      java: `class MinStack {
    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);
        val = Math.min(val, minStack.isEmpty() ? val : minStack.peek());
        minStack.push(val);
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
      cpp: `class MinStack {
    stack<int> st;
    stack<int> minSt;
public:
    void push(int val) {
        st.push(val);
        val = min(val, minSt.empty() ? val : minSt.top());
        minSt.push(val);
    }
    
    void pop() {
        st.pop();
        minSt.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return minSt.top();
    }
};`,
    },
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    category: "Design",
    solutions: {
      javascript: `class LRUCache {
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
      python: `class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.order.remove(key)
        self.order.append(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.order.remove(key)
        elif len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
        self.cache[key] = value
        self.order.append(key)`,
      java: `class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    
    public void put(int key, int value) {
        super.put(key, value);
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
      cpp: `class LRUCache {
    int cap;
    list<pair<int, int>> cache;
    unordered_map<int, list<pair<int, int>>::iterator> map;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (!map.count(key)) return -1;
        cache.splice(cache.begin(), cache, map[key]);
        return map[key]->second;
    }
    
    void put(int key, int value) {
        if (map.count(key)) {
            cache.erase(map[key]);
        } else if (cache.size() >= cap) {
            map.erase(cache.back().first);
            cache.pop_back();
        }
        cache.push_front({key, value});
        map[key] = cache.begin();
    }
};`,
    },
  },
  {
    id: "valid-sudoku",
    title: "Valid Sudoku",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function isValidSudoku(board) {
  const rows = Array(9).fill().map(() => new Set());
  const cols = Array(9).fill().map(() => new Set());
  const boxes = Array(9).fill().map(() => new Set());
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
      python: `def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.': continue
            box = 3 * (r // 3) + c // 3
            if val in rows[r] or val in cols[c] or val in boxes[box]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[box].add(val)
    return True`,
      java: `public boolean isValidSudoku(char[][] board) {
    Set<String> seen = new HashSet<>();
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char val = board[r][c];
            if (val == '.') continue;
            int box = 3 * (r / 3) + c / 3;
            if (!seen.add(val + "r" + r) || 
                !seen.add(val + "c" + c) || 
                !seen.add(val + "b" + box))
                return false;
        }
    }
    return true;
}`,
      cpp: `bool isValidSudoku(vector<vector<char>>& board) {
    vector<set<char>> rows(9), cols(9), boxes(9);
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char val = board[r][c];
            if (val == '.') continue;
            int box = 3 * (r / 3) + c / 3;
            if (rows[r].count(val) || cols[c].count(val) || boxes[box].count(val))
                return false;
            rows[r].insert(val);
            cols[c].insert(val);
            boxes[box].insert(val);
        }
    }
    return true;
}`,
    },
  },
  {
    id: "encode-decode-strings",
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    solutions: {
      javascript: `function encode(strs) {
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
      python: `def encode(strs):
    return ''.join(str(len(s)) + '#' + s for s in strs)

def decode(s):
    res, i = [], 0
    while i < len(s):
        j = i
        while s[j] != '#':
            j += 1
        length = int(s[i:j])
        res.append(s[j + 1:j + 1 + length])
        i = j + 1 + length
    return res`,
      java: `public String encode(List<String> strs) {
    StringBuilder sb = new StringBuilder();
    for (String s : strs) {
        sb.append(s.length()).append('#').append(s);
    }
    return sb.toString();
}

public List<String> decode(String s) {
    List<String> res = new ArrayList<>();
    int i = 0;
    while (i < s.length()) {
        int j = i;
        while (s.charAt(j) != '#') j++;
        int len = Integer.parseInt(s.substring(i, j));
        res.add(s.substring(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return res;
}`,
      cpp: `string encode(vector<string>& strs) {
    string res;
    for (auto& s : strs) {
        res += to_string(s.size()) + '#' + s;
    }
    return res;
}

vector<string> decode(string s) {
    vector<string> res;
    int i = 0;
    while (i < s.size()) {
        int j = i;
        while (s[j] != '#') j++;
        int len = stoi(s.substr(i, j - i));
        res.push_back(s.substr(j + 1, len));
        i = j + 1 + len;
    }
    return res;
}`,
    },
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "Sliding Window",
    solutions: {
      javascript: `function minWindow(s, t) {
  if (!t) return "";
  const countT = {}, window = {};
  for (let c of t) countT[c] = (countT[c] || 0) + 1;
  let have = 0, need = Object.keys(countT).length;
  let res = [-1, -1], resLen = Infinity, l = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    window[c] = (window[c] || 0) + 1;
    if (countT[c] && window[c] === countT[c]) have++;
    while (have === need) {
      if (r - l + 1 < resLen) {
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
      python: `def minWindow(s, t):
    if not t: return ""
    countT, window = {}, {}
    for c in t:
        countT[c] = countT.get(c, 0) + 1
    have, need = 0, len(countT)
    res, resLen = [-1, -1], float('inf')
    l = 0
    for r in range(len(s)):
        c = s[r]
        window[c] = window.get(c, 0) + 1
        if c in countT and window[c] == countT[c]:
            have += 1
        while have == need:
            if r - l + 1 < resLen:
                res = [l, r]
                resLen = r - l + 1
            window[s[l]] -= 1
            if s[l] in countT and window[s[l]] < countT[s[l]]:
                have -= 1
            l += 1
    return "" if resLen == float('inf') else s[res[0]:res[1]+1]`,
      java: `public String minWindow(String s, String t) {
    if (t.isEmpty()) return "";
    Map<Character, Integer> countT = new HashMap<>();
    Map<Character, Integer> window = new HashMap<>();
    for (char c : t.toCharArray()) {
        countT.put(c, countT.getOrDefault(c, 0) + 1);
    }
    int have = 0, need = countT.size();
    int[] res = {-1, -1};
    int resLen = Integer.MAX_VALUE, l = 0;
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        window.put(c, window.getOrDefault(c, 0) + 1);
        if (countT.containsKey(c) && window.get(c).equals(countT.get(c))) have++;
        while (have == need) {
            if (r - l + 1 < resLen) {
                res[0] = l; res[1] = r;
                resLen = r - l + 1;
            }
            char lc = s.charAt(l);
            window.put(lc, window.get(lc) - 1);
            if (countT.containsKey(lc) && window.get(lc) < countT.get(lc)) have--;
            l++;
        }
    }
    return resLen == Integer.MAX_VALUE ? "" : s.substring(res[0], res[1] + 1);
}`,
      cpp: `string minWindow(string s, string t) {
    if (t.empty()) return "";
    unordered_map<char, int> countT, window;
    for (char c : t) countT[c]++;
    int have = 0, need = countT.size();
    int resLen = INT_MAX, resL = 0, l = 0;
    for (int r = 0; r < s.size(); r++) {
        char c = s[r];
        window[c]++;
        if (countT.count(c) && window[c] == countT[c]) have++;
        while (have == need) {
            if (r - l + 1 < resLen) {
                resLen = r - l + 1;
                resL = l;
            }
            window[s[l]]--;
            if (countT.count(s[l]) && window[s[l]] < countT[s[l]]) have--;
            l++;
        }
    }
    return resLen == INT_MAX ? "" : s.substr(resL, resLen);
}`,
    },
  },
  {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Sliding Window",
    solutions: {
      javascript: `function maxSlidingWindow(nums, k) {
  const res = [], deque = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}`,
      python: `from collections import deque
def maxSlidingWindow(nums, k):
    res, q = [], deque()
    for i in range(len(nums)):
        while q and q[0] < i - k + 1:
            q.popleft()
        while q and nums[q[-1]] < nums[i]:
            q.pop()
        q.append(i)
        if i >= k - 1:
            res.append(nums[q[0]])
    return res`,
      java: `public int[] maxSlidingWindow(int[] nums, int k) {
    int[] res = new int[nums.length - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) deque.pollFirst();
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();
        deque.offerLast(i);
        if (i >= k - 1) res[i - k + 1] = nums[deque.peekFirst()];
    }
    return res;
}`,
      cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> res;
    deque<int> dq;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
    },
  },
  {
    id: "permutation-in-string",
    title: "Permutation in String",
    difficulty: "Medium",
    category: "Sliding Window",
    solutions: {
      javascript: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    count[s1.charCodeAt(i) - 97]++;
    count[s2.charCodeAt(i) - 97]--;
  }
  if (count.every(c => c === 0)) return true;
  for (let i = s1.length; i < s2.length; i++) {
    count[s2.charCodeAt(i) - 97]--;
    count[s2.charCodeAt(i - s1.length) - 97]++;
    if (count.every(c => c === 0)) return true;
  }
  return false;
}`,
      python: `def checkInclusion(s1, s2):
    if len(s1) > len(s2): return False
    count = [0] * 26
    for i in range(len(s1)):
        count[ord(s1[i]) - ord('a')] += 1
        count[ord(s2[i]) - ord('a')] -= 1
    if all(c == 0 for c in count): return True
    for i in range(len(s1), len(s2)):
        count[ord(s2[i]) - ord('a')] -= 1
        count[ord(s2[i - len(s1)]) - ord('a')] += 1
        if all(c == 0 for c in count): return True
    return False`,
      java: `public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s1.length(); i++) {
        count[s1.charAt(i) - 'a']++;
        count[s2.charAt(i) - 'a']--;
    }
    if (allZero(count)) return true;
    for (int i = s1.length(); i < s2.length(); i++) {
        count[s2.charAt(i) - 'a']--;
        count[s2.charAt(i - s1.length()) - 'a']++;
        if (allZero(count)) return true;
    }
    return false;
}
boolean allZero(int[] count) {
    for (int c : count) if (c != 0) return false;
    return true;
}`,
      cpp: `bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;
    vector<int> count(26, 0);
    for (int i = 0; i < s1.size(); i++) {
        count[s1[i] - 'a']++;
        count[s2[i] - 'a']--;
    }
    auto allZero = [&]() { for (int c : count) if (c) return false; return true; };
    if (allZero()) return true;
    for (int i = s1.size(); i < s2.size(); i++) {
        count[s2[i] - 'a']--;
        count[s2[i - s1.size()] - 'a']++;
        if (allZero()) return true;
    }
    return false;
}`,
    },
  },
  {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Sliding Window",
    solutions: {
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
      python: `def maxProfit(prices):
    minPrice, maxProfit = float('inf'), 0
    for price in prices:
        minPrice = min(minPrice, price)
        maxProfit = max(maxProfit, price - minPrice)
    return maxProfit`,
      java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, maxProfit = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
    },
  },
  {
    id: "longest-repeating-char-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    solutions: {
      javascript: `function characterReplacement(s, k) {
  let count = {}, res = 0, l = 0, maxf = 0;
  for (let r = 0; r < s.length; r++) {
    count[s[r]] = (count[s[r]] || 0) + 1;
    maxf = Math.max(maxf, count[s[r]]);
    while (r - l + 1 - maxf > k) {
      count[s[l]]--;
      l++;
    }
    res = Math.max(res, r - l + 1);
  }
  return res;
}`,
      python: `def characterReplacement(s, k):
    count = {}
    res = l = maxf = 0
    for r in range(len(s)):
        count[s[r]] = count.get(s[r], 0) + 1
        maxf = max(maxf, count[s[r]])
        while r - l + 1 - maxf > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    return res`,
      java: `public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int res = 0, l = 0, maxf = 0;
    for (int r = 0; r < s.length(); r++) {
        count[s.charAt(r) - 'A']++;
        maxf = Math.max(maxf, count[s.charAt(r) - 'A']);
        while (r - l + 1 - maxf > k) {
            count[s.charAt(l) - 'A']--;
            l++;
        }
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
      cpp: `int characterReplacement(string s, int k) {
    vector<int> count(26, 0);
    int res = 0, l = 0, maxf = 0;
    for (int r = 0; r < s.size(); r++) {
        count[s[r] - 'A']++;
        maxf = max(maxf, count[s[r] - 'A']);
        while (r - l + 1 - maxf > k) {
            count[s[l] - 'A']--;
            l++;
        }
        res = max(res, r - l + 1);
    }
    return res;
}`,
    },
  },
  {
    id: "search-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    solutions: {
      javascript: `function searchMatrix(matrix, target) {
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
      python: `def searchMatrix(matrix, target):
    rows, cols = len(matrix), len(matrix[0])
    l, r = 0, rows * cols - 1
    while l <= r:
        m = (l + r) // 2
        val = matrix[m // cols][m % cols]
        if val == target: return True
        if val < target: l = m + 1
        else: r = m - 1
    return False`,
      java: `public boolean searchMatrix(int[][] matrix, int target) {
    int rows = matrix.length, cols = matrix[0].length;
    int l = 0, r = rows * cols - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        int val = matrix[m / cols][m % cols];
        if (val == target) return true;
        if (val < target) l = m + 1;
        else r = m - 1;
    }
    return false;
}`,
      cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int rows = matrix.size(), cols = matrix[0].size();
    int l = 0, r = rows * cols - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        int val = matrix[m / cols][m % cols];
        if (val == target) return true;
        if (val < target) l = m + 1;
        else r = m - 1;
    }
    return false;
}`,
    },
  },
  {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "Binary Search",
    solutions: {
      javascript: `function minEatingSpeed(piles, h) {
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
      python: `import math
def minEatingSpeed(piles, h):
    l, r = 1, max(piles)
    while l < r:
        m = (l + r) // 2
        hours = sum(math.ceil(p / m) for p in piles)
        if hours <= h:
            r = m
        else:
            l = m + 1
    return l`,
      java: `public int minEatingSpeed(int[] piles, int h) {
    int l = 1, r = Arrays.stream(piles).max().getAsInt();
    while (l < r) {
        int m = l + (r - l) / 2;
        int hours = 0;
        for (int p : piles) hours += (p + m - 1) / m;
        if (hours <= h) r = m;
        else l = m + 1;
    }
    return l;
}`,
      cpp: `int minEatingSpeed(vector<int>& piles, int h) {
    int l = 1, r = *max_element(piles.begin(), piles.end());
    while (l < r) {
        int m = l + (r - l) / 2;
        long hours = 0;
        for (int p : piles) hours += (p + m - 1) / m;
        if (hours <= h) r = m;
        else l = m + 1;
    }
    return l;
}`,
    },
  },
  {
    id: "find-min-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    solutions: {
      javascript: `function findMin(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}`,
      python: `def findMin(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]:
            l = m + 1
        else:
            r = m
    return nums[l]`,
      java: `public int findMin(int[] nums) {
    int l = 0, r = nums.length - 1;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    return nums[l];
}`,
      cpp: `int findMin(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int m = l + (r - l) / 2;
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    return nums[l];
}`,
    },
  },
  {
    id: "search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    solutions: {
      javascript: `function search(nums, target) {
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
      python: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]:
                r = m - 1
            else:
                l = m + 1
        else:
            if nums[m] < target <= nums[r]:
                l = m + 1
            else:
                r = m - 1
    return -1`,
      java: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
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
      cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
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
  },
  {
    id: "time-based-key-value-store",
    title: "Time Based Key-Value Store",
    difficulty: "Medium",
    category: "Binary Search",
    solutions: {
      javascript: `class TimeMap {
  constructor() { this.map = {}; }
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
      python: `class TimeMap:
    def __init__(self):
        self.store = {}
    
    def set(self, key, value, timestamp):
        if key not in self.store:
            self.store[key] = []
        self.store[key].append([timestamp, value])
    
    def get(self, key, timestamp):
        if key not in self.store: return ""
        arr = self.store[key]
        l, r, res = 0, len(arr) - 1, ""
        while l <= r:
            m = (l + r) // 2
            if arr[m][0] <= timestamp:
                res = arr[m][1]
                l = m + 1
            else:
                r = m - 1
        return res`,
      java: `class TimeMap {
    Map<String, List<int[]>> map = new HashMap<>();
    Map<String, List<String>> vals = new HashMap<>();
    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(new int[]{timestamp});
        vals.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
    }
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        List<int[]> times = map.get(key);
        List<String> values = vals.get(key);
        int l = 0, r = times.size() - 1;
        String res = "";
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (times.get(m)[0] <= timestamp) {
                res = values.get(m);
                l = m + 1;
            } else r = m - 1;
        }
        return res;
    }
}`,
      cpp: `class TimeMap {
    unordered_map<string, vector<pair<int, string>>> store;
public:
    void set(string key, string value, int timestamp) {
        store[key].push_back({timestamp, value});
    }
    string get(string key, int timestamp) {
        if (!store.count(key)) return "";
        auto& arr = store[key];
        int l = 0, r = arr.size() - 1;
        string res = "";
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (arr[m].first <= timestamp) {
                res = arr[m].second;
                l = m + 1;
            } else r = m - 1;
        }
        return res;
    }
};`,
    },
  },
  {
    id: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack",
    solutions: {
      javascript: `function evalRPN(tokens) {
  const stack = [];
  for (let t of tokens) {
    if (!isNaN(t)) stack.push(+t);
    else {
      const b = stack.pop(), a = stack.pop();
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
      python: `def evalRPN(tokens):
    stack = []
    for t in tokens:
        if t not in "+-*/":
            stack.append(int(t))
        else:
            b, a = stack.pop(), stack.pop()
            if t == '+': stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            else: stack.append(int(a / b))
    return stack[0]`,
      java: `public int evalRPN(String[] tokens) {
    Stack<Integer> stack = new Stack<>();
    for (String t : tokens) {
        if ("+-*/".contains(t)) {
            int b = stack.pop(), a = stack.pop();
            switch (t) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
            }
        } else stack.push(Integer.parseInt(t));
    }
    return stack.pop();
}`,
      cpp: `int evalRPN(vector<string>& tokens) {
    stack<int> st;
    for (auto& t : tokens) {
        if (t == "+" || t == "-" || t == "*" || t == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (t == "+") st.push(a + b);
            else if (t == "-") st.push(a - b);
            else if (t == "*") st.push(a * b);
            else st.push(a / b);
        } else st.push(stoi(t));
    }
    return st.top();
}`,
    },
  },
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Stack",
    solutions: {
      javascript: `function generateParenthesis(n) {
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
      python: `def generateParenthesis(n):
    res = []
    def backtrack(open, close, s):
        if len(s) == n * 2:
            res.append(s)
            return
        if open < n:
            backtrack(open + 1, close, s + '(')
        if close < open:
            backtrack(open, close + 1, s + ')')
    backtrack(0, 0, '')
    return res`,
      java: `public List<String> generateParenthesis(int n) {
    List<String> res = new ArrayList<>();
    backtrack(res, "", 0, 0, n);
    return res;
}
void backtrack(List<String> res, String s, int open, int close, int n) {
    if (s.length() == n * 2) {
        res.add(s);
        return;
    }
    if (open < n) backtrack(res, s + "(", open + 1, close, n);
    if (close < open) backtrack(res, s + ")", open, close + 1, n);
}`,
      cpp: `vector<string> generateParenthesis(int n) {
    vector<string> res;
    function<void(int, int, string)> backtrack = [&](int open, int close, string s) {
        if (s.size() == n * 2) {
            res.push_back(s);
            return;
        }
        if (open < n) backtrack(open + 1, close, s + "(");
        if (close < open) backtrack(open, close + 1, s + ")");
    };
    backtrack(0, 0, "");
    return res;
}`,
    },
  },
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    solutions: {
      javascript: `function dailyTemperatures(temps) {
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
      python: `def dailyTemperatures(temps):
    res = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and t > temps[stack[-1]]:
            idx = stack.pop()
            res[idx] = i - idx
        stack.append(i)
    return res`,
      java: `public int[] dailyTemperatures(int[] temps) {
    int[] res = new int[temps.length];
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < temps.length; i++) {
        while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
            int idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
}`,
      cpp: `vector<int> dailyTemperatures(vector<int>& temps) {
    vector<int> res(temps.size(), 0);
    stack<int> st;
    for (int i = 0; i < temps.size(); i++) {
        while (!st.empty() && temps[i] > temps[st.top()]) {
            int idx = st.top(); st.pop();
            res[idx] = i - idx;
        }
        st.push(i);
    }
    return res;
}`,
    },
  },
  {
    id: "car-fleet",
    title: "Car Fleet",
    difficulty: "Medium",
    category: "Stack",
    solutions: {
      javascript: `function carFleet(target, position, speed) {
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
      python: `def carFleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)
    fleets, curr = 0, 0
    for p, s in cars:
        time = (target - p) / s
        if time > curr:
            fleets += 1
            curr = time
    return fleets`,
      java: `public int carFleet(int target, int[] position, int[] speed) {
    int n = position.length;
    double[][] cars = new double[n][2];
    for (int i = 0; i < n; i++) {
        cars[i] = new double[]{position[i], (double)(target - position[i]) / speed[i]};
    }
    Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
    int fleets = 0;
    double curr = 0;
    for (double[] car : cars) {
        if (car[1] > curr) {
            fleets++;
            curr = car[1];
        }
    }
    return fleets;
}`,
      cpp: `int carFleet(int target, vector<int>& position, vector<int>& speed) {
    vector<pair<int, double>> cars;
    for (int i = 0; i < position.size(); i++) {
        cars.push_back({position[i], (double)(target - position[i]) / speed[i]});
    }
    sort(cars.rbegin(), cars.rend());
    int fleets = 0;
    double curr = 0;
    for (auto& [p, t] : cars) {
        if (t > curr) {
            fleets++;
            curr = t;
        }
    }
    return fleets;
}`,
    },
  },
  {
    id: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Stack",
    solutions: {
      javascript: `function largestRectangleArea(heights) {
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
      python: `def largestRectangleArea(heights):
    stack = []
    maxArea = 0
    heights.append(0)
    for i, h in enumerate(heights):
        while stack and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            maxArea = max(maxArea, height * width)
        stack.append(i)
    return maxArea`,
      java: `public int largestRectangleArea(int[] heights) {
    Stack<Integer> stack = new Stack<>();
    int maxArea = 0;
    for (int i = 0; i <= heights.length; i++) {
        int h = (i == heights.length) ? 0 : heights[i];
        while (!stack.isEmpty() && h < heights[stack.peek()]) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}`,
      cpp: `int largestRectangleArea(vector<int>& heights) {
    stack<int> st;
    int maxArea = 0;
    heights.push_back(0);
    for (int i = 0; i < heights.size(); i++) {
        while (!st.empty() && heights[i] < heights[st.top()]) {
            int h = heights[st.top()]; st.pop();
            int w = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        st.push(i);
    }
    return maxArea;
}`,
    },
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    category: "Linked List",
    solutions: {
      javascript: `function reorderList(head) {
  if (!head || !head.next) return;
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  let first = head, second = prev;
  while (second) {
    let tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
}`,
      python: `def reorderList(head):
    if not head or not head.next: return
    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    prev, curr = None, slow.next
    slow.next = None
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
      java: `public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode prev = null, curr = slow.next;
    slow.next = null;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    ListNode first = head, second = prev;
    while (second != null) {
        ListNode tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`,
      cpp: `void reorderList(ListNode* head) {
    if (!head || !head->next) return;
    ListNode *slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode *prev = nullptr, *curr = slow->next;
    slow->next = nullptr;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    ListNode *first = head, *second = prev;
    while (second) {
        ListNode *tmp1 = first->next, *tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`,
    },
  },
  {
    id: "remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List",
    solutions: {
      javascript: `function removeNthFromEnd(head, n) {
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
      python: `def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    first = second = dummy
    for _ in range(n + 1):
        first = first.next
    while first:
        first = first.next
        second = second.next
    second.next = second.next.next
    return dummy.next`,
      java: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode first = dummy, second = dummy;
    for (int i = 0; i <= n; i++) first = first.next;
    while (first != null) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}`,
      cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode *first = &dummy, *second = &dummy;
    for (int i = 0; i <= n; i++) first = first->next;
    while (first) {
        first = first->next;
        second = second->next;
    }
    second->next = second->next->next;
    return dummy.next;
}`,
    },
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    solutions: {
      javascript: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy, carry = 0;
  while (l1 || l2 || carry) {
    let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  return dummy.next;
}`,
      python: `def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    curr, carry = dummy, 0
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        total = v1 + v2 + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
      java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int sum = carry;
        if (l1 != null) { sum += l1.val; l1 = l1.next; }
        if (l2 != null) { sum += l2.val; l2 = l2.next; }
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }
    return dummy.next;
}`,
      cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
    }
    return dummy.next;
}`,
    },
  },
  {
    id: "find-duplicate-number",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "Linked List",
    solutions: {
      javascript: `function findDuplicate(nums) {
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
      python: `def findDuplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast: break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
      java: `public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}`,
      cpp: `int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}`,
    },
  },
  {
    id: "copy-list-random-pointer",
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    category: "Linked List",
    solutions: {
      javascript: `function copyRandomList(head) {
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
      python: `def copyRandomList(head):
    if not head: return None
    mapping = {}
    curr = head
    while curr:
        mapping[curr] = Node(curr.val)
        curr = curr.next
    curr = head
    while curr:
        mapping[curr].next = mapping.get(curr.next)
        mapping[curr].random = mapping.get(curr.random)
        curr = curr.next
    return mapping[head]`,
      java: `public Node copyRandomList(Node head) {
    if (head == null) return null;
    Map<Node, Node> map = new HashMap<>();
    Node curr = head;
    while (curr != null) {
        map.put(curr, new Node(curr.val));
        curr = curr.next;
    }
    curr = head;
    while (curr != null) {
        map.get(curr).next = map.get(curr.next);
        map.get(curr).random = map.get(curr.random);
        curr = curr.next;
    }
    return map.get(head);
}`,
      cpp: `Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    unordered_map<Node*, Node*> map;
    Node* curr = head;
    while (curr) {
        map[curr] = new Node(curr->val);
        curr = curr->next;
    }
    curr = head;
    while (curr) {
        map[curr]->next = map[curr->next];
        map[curr]->random = map[curr->random];
        curr = curr->next;
    }
    return map[head];
}`,
    },
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    solutions: {
      javascript: `function mergeKLists(lists) {
  if (!lists.length) return null;
  function merge(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 && l2) {
      if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
      else { curr.next = l2; l2 = l2.next; }
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
      python: `def mergeKLists(lists):
    if not lists: return None
    def merge(l1, l2):
        dummy = ListNode(0)
        curr = dummy
        while l1 and l2:
            if l1.val < l2.val:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next
        curr.next = l1 or l2
        return dummy.next
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge(l1, l2))
        lists = merged
    return lists[0]`,
      java: `public ListNode mergeKLists(ListNode[] lists) {
    if (lists.length == 0) return null;
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode l : lists) if (l != null) pq.offer(l);
    ListNode dummy = new ListNode(0), curr = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        curr.next = node;
        curr = curr.next;
        if (node.next != null) pq.offer(node.next);
    }
    return dummy.next;
}`,
      cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    for (auto l : lists) if (l) pq.push(l);
    ListNode dummy(0), *curr = &dummy;
    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        curr->next = node;
        curr = curr->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`,
    },
  },
  {
    id: "reverse-nodes-k-group",
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    category: "Linked List",
    solutions: {
      javascript: `function reverseKGroup(head, k) {
  let count = 0, curr = head;
  while (curr && count < k) { curr = curr.next; count++; }
  if (count < k) return head;
  let prev = reverseKGroup(curr, k);
  while (count-- > 0) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
      python: `def reverseKGroup(head, k):
    count, curr = 0, head
    while curr and count < k:
        curr = curr.next
        count += 1
    if count < k: return head
    prev = reverseKGroup(curr, k)
    while count > 0:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
        count -= 1
    return prev`,
      java: `public ListNode reverseKGroup(ListNode head, int k) {
    int count = 0;
    ListNode curr = head;
    while (curr != null && count < k) { curr = curr.next; count++; }
    if (count < k) return head;
    ListNode prev = reverseKGroup(curr, k);
    while (count-- > 0) {
        ListNode next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}`,
      cpp: `ListNode* reverseKGroup(ListNode* head, int k) {
    int count = 0;
    ListNode* curr = head;
    while (curr && count < k) { curr = curr->next; count++; }
    if (count < k) return head;
    ListNode* prev = reverseKGroup(curr, k);
    while (count-- > 0) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}`,
    },
  },
  {
    id: "diameter-binary-tree",
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    solutions: {
      javascript: `function diameterOfBinaryTree(root) {
  let diameter = 0;
  function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }
  dfs(root);
  return diameter;
}`,
      python: `def diameterOfBinaryTree(root):
    diameter = 0
    def dfs(node):
        nonlocal diameter
        if not node: return 0
        left = dfs(node.left)
        right = dfs(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    dfs(root)
    return diameter`,
      java: `int diameter = 0;
public int diameterOfBinaryTree(TreeNode root) {
    dfs(root);
    return diameter;
}
int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = dfs(node.left);
    int right = dfs(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
}`,
      cpp: `int diameter = 0;
int diameterOfBinaryTree(TreeNode* root) {
    dfs(root);
    return diameter;
}
int dfs(TreeNode* node) {
    if (!node) return 0;
    int left = dfs(node->left);
    int right = dfs(node->right);
    diameter = max(diameter, left + right);
    return 1 + max(left, right);
}`,
    },
  },
  {
    id: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    solutions: {
      javascript: `function isBalanced(root) {
  function dfs(node) {
    if (!node) return [true, 0];
    const [leftBal, leftH] = dfs(node.left);
    const [rightBal, rightH] = dfs(node.right);
    const balanced = leftBal && rightBal && Math.abs(leftH - rightH) <= 1;
    return [balanced, 1 + Math.max(leftH, rightH)];
  }
  return dfs(root)[0];
}`,
      python: `def isBalanced(root):
    def dfs(node):
        if not node: return True, 0
        leftBal, leftH = dfs(node.left)
        rightBal, rightH = dfs(node.right)
        balanced = leftBal and rightBal and abs(leftH - rightH) <= 1
        return balanced, 1 + max(leftH, rightH)
    return dfs(root)[0]`,
      java: `public boolean isBalanced(TreeNode root) {
    return dfs(root)[0] == 1;
}
int[] dfs(TreeNode node) {
    if (node == null) return new int[]{1, 0};
    int[] left = dfs(node.left);
    int[] right = dfs(node.right);
    int balanced = (left[0] == 1 && right[0] == 1 && Math.abs(left[1] - right[1]) <= 1) ? 1 : 0;
    return new int[]{balanced, 1 + Math.max(left[1], right[1])};
}`,
      cpp: `bool isBalanced(TreeNode* root) {
    return dfs(root).first;
}
pair<bool, int> dfs(TreeNode* node) {
    if (!node) return {true, 0};
    auto [leftBal, leftH] = dfs(node->left);
    auto [rightBal, rightH] = dfs(node->right);
    bool balanced = leftBal && rightBal && abs(leftH - rightH) <= 1;
    return {balanced, 1 + max(leftH, rightH)};
}`,
    },
  },
  {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "Trees",
    solutions: {
      javascript: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      python: `def isSameTree(p, q):
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
      java: `public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null || p.val != q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q || p->val != q->val) return false;
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
    },
  },
  {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    category: "Trees",
    solutions: {
      javascript: `function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
function isSame(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isSame(a.left, b.left) && isSame(a.right, b.right);
}`,
      python: `def isSubtree(root, subRoot):
    def isSame(a, b):
        if not a and not b: return True
        if not a or not b or a.val != b.val: return False
        return isSame(a.left, b.left) and isSame(a.right, b.right)
    if not root: return False
    if isSame(root, subRoot): return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)`,
      java: `public boolean isSubtree(TreeNode root, TreeNode subRoot) {
    if (root == null) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
boolean isSame(TreeNode a, TreeNode b) {
    if (a == null && b == null) return true;
    if (a == null || b == null || a.val != b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right);
}`,
      cpp: `bool isSubtree(TreeNode* root, TreeNode* subRoot) {
    if (!root) return false;
    if (isSame(root, subRoot)) return true;
    return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
}
bool isSame(TreeNode* a, TreeNode* b) {
    if (!a && !b) return true;
    if (!a || !b || a->val != b->val) return false;
    return isSame(a->left, b->left) && isSame(a->right, b->right);
}`,
    },
  },
  {
    id: "lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) root = root.left;
    else if (p.val > root.val && q.val > root.val) root = root.right;
    else return root;
  }
}`,
      python: `def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}`,
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val) root = root->left;
        else if (p->val > root->val && q->val > root->val) root = root->right;
        else return root;
    }
    return nullptr;
}`,
    },
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const level = [], len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
      python: `def levelOrder(root):
    if not root: return []
    res, queue = [], [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        res.append(level)
    return res`,
      java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        List<Integer> level = new ArrayList<>();
        int len = queue.size();
        for (int i = 0; i < len; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        res.add(level);
    }
    return res;
}`,
      cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        vector<int> level;
        int len = q.size();
        for (int i = 0; i < len; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`,
    },
  },
  {
    id: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function rightSideView(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      if (i === len - 1) res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
}`,
      python: `def rightSideView(root):
    if not root: return []
    res, queue = [], [root]
    while queue:
        length = len(queue)
        for i in range(length):
            node = queue.pop(0)
            if i == length - 1: res.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
    return res`,
      java: `public List<Integer> rightSideView(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int len = queue.size();
        for (int i = 0; i < len; i++) {
            TreeNode node = queue.poll();
            if (i == len - 1) res.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    return res;
}`,
      cpp: `vector<int> rightSideView(TreeNode* root) {
    vector<int> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int len = q.size();
        for (int i = 0; i < len; i++) {
            TreeNode* node = q.front(); q.pop();
            if (i == len - 1) res.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return res;
}`,
    },
  },
  {
    id: "count-good-nodes",
    title: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function goodNodes(root) {
  let count = 0;
  function dfs(node, maxVal) {
    if (!node) return;
    if (node.val >= maxVal) count++;
    dfs(node.left, Math.max(maxVal, node.val));
    dfs(node.right, Math.max(maxVal, node.val));
  }
  dfs(root, root.val);
  return count;
}`,
      python: `def goodNodes(root):
    count = 0
    def dfs(node, maxVal):
        nonlocal count
        if not node: return
        if node.val >= maxVal: count += 1
        dfs(node.left, max(maxVal, node.val))
        dfs(node.right, max(maxVal, node.val))
    dfs(root, root.val)
    return count`,
      java: `int count = 0;
public int goodNodes(TreeNode root) {
    dfs(root, root.val);
    return count;
}
void dfs(TreeNode node, int maxVal) {
    if (node == null) return;
    if (node.val >= maxVal) count++;
    dfs(node.left, Math.max(maxVal, node.val));
    dfs(node.right, Math.max(maxVal, node.val));
}`,
      cpp: `int count = 0;
int goodNodes(TreeNode* root) {
    dfs(root, root->val);
    return count;
}
void dfs(TreeNode* node, int maxVal) {
    if (!node) return;
    if (node->val >= maxVal) count++;
    dfs(node->left, max(maxVal, node->val));
    dfs(node->right, max(maxVal, node->val));
}`,
    },
  },
  {
    id: "validate-bst",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function isValidBST(root) {
  function dfs(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  }
  return dfs(root, -Infinity, Infinity);
}`,
      python: `def isValidBST(root):
    def dfs(node, minVal, maxVal):
        if not node: return True
        if node.val <= minVal or node.val >= maxVal: return False
        return dfs(node.left, minVal, node.val) and dfs(node.right, node.val, maxVal)
    return dfs(root, float('-inf'), float('inf'))`,
      java: `public boolean isValidBST(TreeNode root) {
    return dfs(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
boolean dfs(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
}`,
      cpp: `bool isValidBST(TreeNode* root) {
    return dfs(root, LONG_MIN, LONG_MAX);
}
bool dfs(TreeNode* node, long minVal, long maxVal) {
    if (!node) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return dfs(node->left, minVal, node->val) && dfs(node->right, node->val, maxVal);
}`,
    },
  },
  {
    id: "kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function kthSmallest(root, k) {
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
      python: `def kthSmallest(root, k):
    stack = []
    while True:
        while root:
            stack.append(root)
            root = root.left
        root = stack.pop()
        k -= 1
        if k == 0: return root.val
        root = root.right`,
      java: `public int kthSmallest(TreeNode root, int k) {
    Stack<TreeNode> stack = new Stack<>();
    while (true) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (--k == 0) return root.val;
        root = root.right;
    }
}`,
      cpp: `int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> st;
    while (true) {
        while (root) {
            st.push(root);
            root = root->left;
        }
        root = st.top(); st.pop();
        if (--k == 0) return root->val;
        root = root->right;
    }
}`,
    },
  },
  {
    id: "construct-tree-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder",
    difficulty: "Medium",
    category: "Trees",
    solutions: {
      javascript: `function buildTree(preorder, inorder) {
  const map = new Map();
  inorder.forEach((v, i) => map.set(v, i));
  let idx = 0;
  function build(l, r) {
    if (l > r) return null;
    const val = preorder[idx++];
    const node = new TreeNode(val);
    node.left = build(l, map.get(val) - 1);
    node.right = build(map.get(val) + 1, r);
    return node;
  }
  return build(0, inorder.length - 1);
}`,
      python: `def buildTree(preorder, inorder):
    inorder_map = {v: i for i, v in enumerate(inorder)}
    idx = [0]
    def build(l, r):
        if l > r: return None
        val = preorder[idx[0]]
        idx[0] += 1
        node = TreeNode(val)
        node.left = build(l, inorder_map[val] - 1)
        node.right = build(inorder_map[val] + 1, r)
        return node
    return build(0, len(inorder) - 1)`,
      java: `int idx = 0;
Map<Integer, Integer> map = new HashMap<>();
public TreeNode buildTree(int[] preorder, int[] inorder) {
    for (int i = 0; i < inorder.length; i++) map.put(inorder[i], i);
    return build(preorder, 0, inorder.length - 1);
}
TreeNode build(int[] preorder, int l, int r) {
    if (l > r) return null;
    int val = preorder[idx++];
    TreeNode node = new TreeNode(val);
    node.left = build(preorder, l, map.get(val) - 1);
    node.right = build(preorder, map.get(val) + 1, r);
    return node;
}`,
      cpp: `int idx = 0;
unordered_map<int, int> map;
TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    for (int i = 0; i < inorder.size(); i++) map[inorder[i]] = i;
    return build(preorder, 0, inorder.size() - 1);
}
TreeNode* build(vector<int>& preorder, int l, int r) {
    if (l > r) return nullptr;
    int val = preorder[idx++];
    TreeNode* node = new TreeNode(val);
    node->left = build(preorder, l, map[val] - 1);
    node->right = build(preorder, map[val] + 1, r);
    return node;
}`,
    },
  },
  {
    id: "binary-tree-max-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Trees",
    solutions: {
      javascript: `function maxPathSum(root) {
  let maxSum = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return maxSum;
}`,
      python: `def maxPathSum(root):
    maxSum = float('-inf')
    def dfs(node):
        nonlocal maxSum
        if not node: return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        maxSum = max(maxSum, node.val + left + right)
        return node.val + max(left, right)
    dfs(root)
    return maxSum`,
      java: `int maxSum = Integer.MIN_VALUE;
public int maxPathSum(TreeNode root) {
    dfs(root);
    return maxSum;
}
int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = Math.max(dfs(node.left), 0);
    int right = Math.max(dfs(node.right), 0);
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
}`,
      cpp: `int maxSum = INT_MIN;
int maxPathSum(TreeNode* root) {
    dfs(root);
    return maxSum;
}
int dfs(TreeNode* node) {
    if (!node) return 0;
    int left = max(dfs(node->left), 0);
    int right = max(dfs(node->right), 0);
    maxSum = max(maxSum, node->val + left + right);
    return node->val + max(left, right);
}`,
    },
  },
  {
    id: "serialize-deserialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Trees",
    solutions: {
      javascript: `function serialize(root) {
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
  let idx = 0;
  function build() {
    if (vals[idx] === "N") { idx++; return null; }
    const node = new TreeNode(parseInt(vals[idx++]));
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}`,
      python: `def serialize(root):
    res = []
    def dfs(node):
        if not node:
            res.append("N")
            return
        res.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return ",".join(res)

def deserialize(data):
    vals = data.split(",")
    idx = [0]
    def build():
        if vals[idx[0]] == "N":
            idx[0] += 1
            return None
        node = TreeNode(int(vals[idx[0]]))
        idx[0] += 1
        node.left = build()
        node.right = build()
        return node
    return build()`,
      java: `public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    serializeHelper(root, sb);
    return sb.toString();
}
void serializeHelper(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("N,"); return; }
    sb.append(node.val).append(",");
    serializeHelper(node.left, sb);
    serializeHelper(node.right, sb);
}
public TreeNode deserialize(String data) {
    Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
    return deserializeHelper(queue);
}
TreeNode deserializeHelper(Queue<String> queue) {
    String val = queue.poll();
    if (val.equals("N")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(val));
    node.left = deserializeHelper(queue);
    node.right = deserializeHelper(queue);
    return node;
}`,
      cpp: `string serialize(TreeNode* root) {
    string res;
    function<void(TreeNode*)> dfs = [&](TreeNode* node) {
        if (!node) { res += "N,"; return; }
        res += to_string(node->val) + ",";
        dfs(node->left);
        dfs(node->right);
    };
    dfs(root);
    return res;
}
TreeNode* deserialize(string data) {
    stringstream ss(data);
    string token;
    queue<string> tokens;
    while (getline(ss, token, ',')) tokens.push(token);
    function<TreeNode*()> build = [&]() -> TreeNode* {
        string val = tokens.front(); tokens.pop();
        if (val == "N") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = build();
        node->right = build();
        return node;
    };
    return build();
}`,
    },
  },
  {
    id: "implement-trie",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Tries",
    solutions: {
      javascript: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) return false;
      node = node[c];
    }
    return node.isEnd === true;
  }
  startsWith(prefix) {
    let node = this.root;
    for (let c of prefix) {
      if (!node[c]) return false;
      node = node[c];
    }
    return true;
  }
}`,
      python: `class Trie:
    def __init__(self):
        self.root = {}
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node: node[c] = {}
            node = node[c]
        node['#'] = True
    def search(self, word):
        node = self.root
        for c in word:
            if c not in node: return False
            node = node[c]
        return '#' in node
    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node: return False
            node = node[c]
        return True`,
      java: `class Trie {
    private TrieNode root = new TrieNode();
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd;
    }
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new TrieNode();
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return node.isEnd;
    }
    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return true;
    }
}`,
      cpp: `class Trie {
    struct TrieNode {
        TrieNode* children[26] = {};
        bool isEnd = false;
    };
    TrieNode* root = new TrieNode();
public:
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) node->children[c - 'a'] = new TrieNode();
            node = node->children[c - 'a'];
        }
        node->isEnd = true;
    }
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) return false;
            node = node->children[c - 'a'];
        }
        return node->isEnd;
    }
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children[c - 'a']) return false;
            node = node->children[c - 'a'];
        }
        return true;
    }
};`,
    },
  },
  {
    id: "design-add-search-words",
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    category: "Tries",
    solutions: {
      javascript: `class WordDictionary {
  constructor() { this.root = {}; }
  addWord(word) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.isEnd = true;
  }
  search(word) {
    function dfs(node, i) {
      if (i === word.length) return node.isEnd === true;
      if (word[i] === '.') {
        for (let key in node) {
          if (key !== 'isEnd' && dfs(node[key], i + 1)) return true;
        }
        return false;
      }
      if (!node[word[i]]) return false;
      return dfs(node[word[i]], i + 1);
    }
    return dfs(this.root, 0);
  }
}`,
      python: `class WordDictionary:
    def __init__(self):
        self.root = {}
    def addWord(self, word):
        node = self.root
        for c in word:
            if c not in node: node[c] = {}
            node = node[c]
        node['#'] = True
    def search(self, word):
        def dfs(node, i):
            if i == len(word): return '#' in node
            if word[i] == '.':
                for key in node:
                    if key != '#' and dfs(node[key], i + 1): return True
                return False
            if word[i] not in node: return False
            return dfs(node[word[i]], i + 1)
        return dfs(self.root, 0)`,
      java: `class WordDictionary {
    TrieNode root = new TrieNode();
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd;
    }
    public void addWord(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new TrieNode();
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    public boolean search(String word) {
        return dfs(word, 0, root);
    }
    boolean dfs(String word, int i, TrieNode node) {
        if (i == word.length()) return node.isEnd;
        char c = word.charAt(i);
        if (c == '.') {
            for (TrieNode child : node.children) {
                if (child != null && dfs(word, i + 1, child)) return true;
            }
            return false;
        }
        if (node.children[c - 'a'] == null) return false;
        return dfs(word, i + 1, node.children[c - 'a']);
    }
}`,
      cpp: `class WordDictionary {
    struct TrieNode {
        TrieNode* children[26] = {};
        bool isEnd = false;
    };
    TrieNode* root = new TrieNode();
public:
    void addWord(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) node->children[c - 'a'] = new TrieNode();
            node = node->children[c - 'a'];
        }
        node->isEnd = true;
    }
    bool search(string word) {
        return dfs(word, 0, root);
    }
    bool dfs(string& word, int i, TrieNode* node) {
        if (i == word.size()) return node->isEnd;
        if (word[i] == '.') {
            for (auto child : node->children) {
                if (child && dfs(word, i + 1, child)) return true;
            }
            return false;
        }
        if (!node->children[word[i] - 'a']) return false;
        return dfs(word, i + 1, node->children[word[i] - 'a']);
    }
};`,
    },
  },
  {
    id: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    category: "Tries",
    solutions: {
      javascript: `function findWords(board, words) {
  const root = {};
  for (let word of words) {
    let node = root;
    for (let c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.word = word;
  }
  const res = [], rows = board.length, cols = board[0].length;
  function dfs(r, c, node) {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    const char = board[r][c];
    if (char === '#' || !node[char]) return;
    node = node[char];
    if (node.word) { res.push(node.word); node.word = null; }
    board[r][c] = '#';
    dfs(r + 1, c, node); dfs(r - 1, c, node);
    dfs(r, c + 1, node); dfs(r, c - 1, node);
    board[r][c] = char;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dfs(r, c, root);
  }
  return res;
}`,
      python: `def findWords(board, words):
    root = {}
    for word in words:
        node = root
        for c in word:
            if c not in node: node[c] = {}
            node = node[c]
        node['#'] = word
    res, rows, cols = [], len(board), len(board[0])
    def dfs(r, c, node):
        if r < 0 or c < 0 or r >= rows or c >= cols: return
        char = board[r][c]
        if char == '.' or char not in node: return
        node = node[char]
        if '#' in node:
            res.append(node['#'])
            del node['#']
        board[r][c] = '.'
        dfs(r + 1, c, node); dfs(r - 1, c, node)
        dfs(r, c + 1, node); dfs(r, c - 1, node)
        board[r][c] = char
    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)
    return res`,
      java: `class Solution {
    Set<String> res = new HashSet<>();
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = buildTrie(words);
        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                dfs(board, r, c, root);
            }
        }
        return new ArrayList<>(res);
    }
    void dfs(char[][] board, int r, int c, TrieNode node) {
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) return;
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;
        node = node.children[ch - 'a'];
        if (node.word != null) res.add(node.word);
        board[r][c] = '#';
        dfs(board, r + 1, c, node); dfs(board, r - 1, c, node);
        dfs(board, r, c + 1, node); dfs(board, r, c - 1, node);
        board[r][c] = ch;
    }
    TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode node = root;
            for (char c : w.toCharArray()) {
                if (node.children[c - 'a'] == null) node.children[c - 'a'] = new TrieNode();
                node = node.children[c - 'a'];
            }
            node.word = w;
        }
        return root;
    }
    class TrieNode { TrieNode[] children = new TrieNode[26]; String word; }
}`,
      cpp: `class Solution {
    struct TrieNode {
        TrieNode* children[26] = {};
        string word;
    };
    vector<string> res;
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) {
            TrieNode* node = root;
            for (char c : w) {
                if (!node->children[c - 'a']) node->children[c - 'a'] = new TrieNode();
                node = node->children[c - 'a'];
            }
            node->word = w;
        }
        for (int r = 0; r < board.size(); r++) {
            for (int c = 0; c < board[0].size(); c++) {
                dfs(board, r, c, root);
            }
        }
        return res;
    }
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node) {
        if (r < 0 || c < 0 || r >= board.size() || c >= board[0].size()) return;
        char ch = board[r][c];
        if (ch == '#' || !node->children[ch - 'a']) return;
        node = node->children[ch - 'a'];
        if (!node->word.empty()) { res.push_back(node->word); node->word = ""; }
        board[r][c] = '#';
        dfs(board, r + 1, c, node); dfs(board, r - 1, c, node);
        dfs(board, r, c + 1, node); dfs(board, r, c - 1, node);
        board[r][c] = ch;
    }
};`,
    },
  },
  {
    id: "kth-largest-in-stream",
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    category: "Heap",
    solutions: {
      javascript: `class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.heap = [];
    for (let n of nums) this.add(n);
  }
  add(val) {
    this.heap.push(val);
    this.heap.sort((a, b) => a - b);
    if (this.heap.length > this.k) this.heap.shift();
    return this.heap[0];
  }
}`,
      python: `import heapq
class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)
    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
      java: `class KthLargest {
    PriorityQueue<Integer> pq;
    int k;
    public KthLargest(int k, int[] nums) {
        this.k = k;
        pq = new PriorityQueue<>();
        for (int n : nums) add(n);
    }
    public int add(int val) {
        pq.offer(val);
        if (pq.size() > k) pq.poll();
        return pq.peek();
    }
}`,
      cpp: `class KthLargest {
    priority_queue<int, vector<int>, greater<int>> pq;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int n : nums) add(n);
    }
    int add(int val) {
        pq.push(val);
        if (pq.size() > k) pq.pop();
        return pq.top();
    }
};`,
    },
  },
  {
    id: "last-stone-weight",
    title: "Last Stone Weight",
    difficulty: "Easy",
    category: "Heap",
    solutions: {
      javascript: `function lastStoneWeight(stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a);
    const y = stones.shift();
    const x = stones.shift();
    if (x !== y) stones.push(y - x);
  }
  return stones.length ? stones[0] : 0;
}`,
      python: `import heapq
def lastStoneWeight(stones):
    stones = [-s for s in stones]
    heapq.heapify(stones)
    while len(stones) > 1:
        y = -heapq.heappop(stones)
        x = -heapq.heappop(stones)
        if x != y:
            heapq.heappush(stones, -(y - x))
    return -stones[0] if stones else 0`,
      java: `public int lastStoneWeight(int[] stones) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    for (int s : stones) pq.offer(s);
    while (pq.size() > 1) {
        int y = pq.poll();
        int x = pq.poll();
        if (x != y) pq.offer(y - x);
    }
    return pq.isEmpty() ? 0 : pq.peek();
}`,
      cpp: `int lastStoneWeight(vector<int>& stones) {
    priority_queue<int> pq(stones.begin(), stones.end());
    while (pq.size() > 1) {
        int y = pq.top(); pq.pop();
        int x = pq.top(); pq.pop();
        if (x != y) pq.push(y - x);
    }
    return pq.empty() ? 0 : pq.top();
}`,
    },
  },
  {
    id: "k-closest-points",
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "Heap",
    solutions: {
      javascript: `function kClosest(points, k) {
  return points.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1])).slice(0, k);
}`,
      python: `def kClosest(points, k):
    points.sort(key=lambda p: p[0]**2 + p[1]**2)
    return points[:k]`,
      java: `public int[][] kClosest(int[][] points, int k) {
    Arrays.sort(points, (a, b) -> (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
    return Arrays.copyOfRange(points, 0, k);
}`,
      cpp: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
    sort(points.begin(), points.end(), [](auto& a, auto& b) {
        return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1];
    });
    return vector<vector<int>>(points.begin(), points.begin() + k);
}`,
    },
  },
  {
    id: "kth-largest-element",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Heap",
    solutions: {
      javascript: `function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`,
      python: `def findKthLargest(nums, k):
    nums.sort(reverse=True)
    return nums[k - 1]`,
      java: `public int findKthLargest(int[] nums, int k) {
    Arrays.sort(nums);
    return nums[nums.length - k];
}`,
      cpp: `int findKthLargest(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end(), greater<int>());
    return nums[k - 1];
}`,
    },
  },
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    category: "Heap",
    solutions: {
      javascript: `function leastInterval(tasks, n) {
  const count = {};
  for (let t of tasks) count[t] = (count[t] || 0) + 1;
  const max = Math.max(...Object.values(count));
  let maxCount = 0;
  for (let c of Object.values(count)) if (c === max) maxCount++;
  return Math.max(tasks.length, (max - 1) * (n + 1) + maxCount);
}`,
      python: `def leastInterval(tasks, n):
    from collections import Counter
    count = Counter(tasks)
    maxCount = max(count.values())
    numMax = sum(1 for c in count.values() if c == maxCount)
    return max(len(tasks), (maxCount - 1) * (n + 1) + numMax)`,
      java: `public int leastInterval(char[] tasks, int n) {
    int[] count = new int[26];
    for (char t : tasks) count[t - 'A']++;
    int max = Arrays.stream(count).max().getAsInt();
    int maxCount = (int) Arrays.stream(count).filter(c -> c == max).count();
    return Math.max(tasks.length, (max - 1) * (n + 1) + maxCount);
}`,
      cpp: `int leastInterval(vector<char>& tasks, int n) {
    vector<int> count(26, 0);
    for (char t : tasks) count[t - 'A']++;
    int maxCount = *max_element(count.begin(), count.end());
    int numMax = count_if(count.begin(), count.end(), [maxCount](int c) { return c == maxCount; });
    return max((int)tasks.size(), (maxCount - 1) * (n + 1) + numMax);
}`,
    },
  },
  {
    id: "find-median-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "Heap",
    solutions: {
      javascript: `class MedianFinder {
  constructor() {
    this.small = [];
    this.large = [];
  }
  addNum(num) {
    this.small.push(num);
    this.small.sort((a, b) => b - a);
    this.large.push(this.small.shift());
    this.large.sort((a, b) => a - b);
    if (this.large.length > this.small.length) {
      this.small.unshift(this.large.shift());
    }
  }
  findMedian() {
    if (this.small.length > this.large.length) return this.small[0];
    return (this.small[0] + this.large[0]) / 2;
  }
}`,
      python: `import heapq
class MedianFinder:
    def __init__(self):
        self.small = []
        self.large = []
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,
      java: `class MedianFinder {
    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
    PriorityQueue<Integer> large = new PriorityQueue<>();
    public void addNum(int num) {
        small.offer(num);
        large.offer(small.poll());
        if (large.size() > small.size()) small.offer(large.poll());
    }
    public double findMedian() {
        if (small.size() > large.size()) return small.peek();
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
      cpp: `class MedianFinder {
    priority_queue<int> small;
    priority_queue<int, vector<int>, greater<int>> large;
public:
    void addNum(int num) {
        small.push(num);
        large.push(small.top()); small.pop();
        if (large.size() > small.size()) { small.push(large.top()); large.pop(); }
    }
    double findMedian() {
        if (small.size() > large.size()) return small.top();
        return (small.top() + large.top()) / 2.0;
    }
};`,
    },
  },
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function subsets(nums) {
  const res = [];
  function backtrack(start, curr) {
    res.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      backtrack(i + 1, curr);
      curr.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      python: `def subsets(nums):
    res = []
    def backtrack(start, curr):
        res.append(curr[:])
        for i in range(start, len(nums)):
            curr.append(nums[i])
            backtrack(i + 1, curr)
            curr.pop()
    backtrack(0, [])
    return res`,
      java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), res);
    return res;
}
void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {
    res.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(nums, i + 1, curr, res);
        curr.remove(curr.size() - 1);
    }
}`,
      cpp: `vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int)> backtrack = [&](int start) {
        res.push_back(curr);
        for (int i = start; i < nums.size(); i++) {
            curr.push_back(nums[i]);
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(0);
    return res;
}`,
    },
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function combinationSum(candidates, target) {
  const res = [];
  function backtrack(start, curr, sum) {
    if (sum === target) { res.push([...curr]); return; }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      curr.push(candidates[i]);
      backtrack(i, curr, sum + candidates[i]);
      curr.pop();
    }
  }
  backtrack(0, [], 0);
  return res;
}`,
      python: `def combinationSum(candidates, target):
    res = []
    def backtrack(start, curr, total):
        if total == target:
            res.append(curr[:])
            return
        if total > target: return
        for i in range(start, len(candidates)):
            curr.append(candidates[i])
            backtrack(i, curr, total + candidates[i])
            curr.pop()
    backtrack(0, [], 0)
    return res`,
      java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), res, 0);
    return res;
}
void backtrack(int[] candidates, int target, int start, List<Integer> curr, List<List<Integer>> res, int sum) {
    if (sum == target) { res.add(new ArrayList<>(curr)); return; }
    if (sum > target) return;
    for (int i = start; i < candidates.length; i++) {
        curr.add(candidates[i]);
        backtrack(candidates, target, i, curr, res, sum + candidates[i]);
        curr.remove(curr.size() - 1);
    }
}`,
      cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int, int)> backtrack = [&](int start, int sum) {
        if (sum == target) { res.push_back(curr); return; }
        if (sum > target) return;
        for (int i = start; i < candidates.size(); i++) {
            curr.push_back(candidates[i]);
            backtrack(i, sum + candidates[i]);
            curr.pop_back();
        }
    };
    backtrack(0, 0);
    return res;
}`,
    },
  },
  {
    id: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function permute(nums) {
  const res = [];
  function backtrack(curr, remaining) {
    if (!remaining.length) { res.push(curr); return; }
    for (let i = 0; i < remaining.length; i++) {
      backtrack([...curr, remaining[i]], [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
    }
  }
  backtrack([], nums);
  return res;
}`,
      python: `def permute(nums):
    res = []
    def backtrack(curr, remaining):
        if not remaining:
            res.append(curr)
            return
        for i in range(len(remaining)):
            backtrack(curr + [remaining[i]], remaining[:i] + remaining[i+1:])
    backtrack([], nums)
    return res`,
      java: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, new ArrayList<>(), res, new boolean[nums.length]);
    return res;
}
void backtrack(int[] nums, List<Integer> curr, List<List<Integer>> res, boolean[] used) {
    if (curr.size() == nums.length) { res.add(new ArrayList<>(curr)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        curr.add(nums[i]);
        backtrack(nums, curr, res, used);
        curr.remove(curr.size() - 1);
        used[i] = false;
    }
}`,
      cpp: `vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> curr;
    vector<bool> used(nums.size(), false);
    function<void()> backtrack = [&]() {
        if (curr.size() == nums.size()) { res.push_back(curr); return; }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.push_back(nums[i]);
            backtrack();
            curr.pop_back();
            used[i] = false;
        }
    };
    backtrack();
    return res;
}`,
    },
  },
  {
    id: "subsets-ii",
    title: "Subsets II",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  function backtrack(start, curr) {
    res.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      curr.push(nums[i]);
      backtrack(i + 1, curr);
      curr.pop();
    }
  }
  backtrack(0, []);
  return res;
}`,
      python: `def subsetsWithDup(nums):
    nums.sort()
    res = []
    def backtrack(start, curr):
        res.append(curr[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]: continue
            curr.append(nums[i])
            backtrack(i + 1, curr)
            curr.pop()
    backtrack(0, [])
    return res`,
      java: `public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), res);
    return res;
}
void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {
    res.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        curr.add(nums[i]);
        backtrack(nums, i + 1, curr, res);
        curr.remove(curr.size() - 1);
    }
}`,
      cpp: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int)> backtrack = [&](int start) {
        res.push_back(curr);
        for (int i = start; i < nums.size(); i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            curr.push_back(nums[i]);
            backtrack(i + 1);
            curr.pop_back();
        }
    };
    backtrack(0);
    return res;
}`,
    },
  },
  {
    id: "combination-sum-ii",
    title: "Combination Sum II",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];
  function backtrack(start, curr, sum) {
    if (sum === target) { res.push([...curr]); return; }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      curr.push(candidates[i]);
      backtrack(i + 1, curr, sum + candidates[i]);
      curr.pop();
    }
  }
  backtrack(0, [], 0);
  return res;
}`,
      python: `def combinationSum2(candidates, target):
    candidates.sort()
    res = []
    def backtrack(start, curr, total):
        if total == target:
            res.append(curr[:])
            return
        if total > target: return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]: continue
            curr.append(candidates[i])
            backtrack(i + 1, curr, total + candidates[i])
            curr.pop()
    backtrack(0, [], 0)
    return res`,
      java: `public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);
    List<List<Integer>> res = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), res, 0);
    return res;
}
void backtrack(int[] candidates, int target, int start, List<Integer> curr, List<List<Integer>> res, int sum) {
    if (sum == target) { res.add(new ArrayList<>(curr)); return; }
    if (sum > target) return;
    for (int i = start; i < candidates.length; i++) {
        if (i > start && candidates[i] == candidates[i - 1]) continue;
        curr.add(candidates[i]);
        backtrack(candidates, target, i + 1, curr, res, sum + candidates[i]);
        curr.remove(curr.size() - 1);
    }
}`,
      cpp: `vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int, int)> backtrack = [&](int start, int sum) {
        if (sum == target) { res.push_back(curr); return; }
        if (sum > target) return;
        for (int i = start; i < candidates.size(); i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            curr.push_back(candidates[i]);
            backtrack(i + 1, sum + candidates[i]);
            curr.pop_back();
        }
    };
    backtrack(0, 0);
    return res;
}`,
    },
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;
    const temp = board[r][c];
    board[r][c] = '#';
    const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = temp;
    return found;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,
      python: `def exist(board, word):
    rows, cols = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word): return True
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != word[i]: return False
        temp = board[r][c]
        board[r][c] = '#'
        found = dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1)
        board[r][c] = temp
        return found
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False`,
      java: `public boolean exist(char[][] board, String word) {
    for (int r = 0; r < board.length; r++) {
        for (int c = 0; c < board[0].length; c++) {
            if (dfs(board, word, r, c, 0)) return true;
        }
    }
    return false;
}
boolean dfs(char[][] board, String word, int r, int c, int i) {
    if (i == word.length()) return true;
    if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != word.charAt(i)) return false;
    char temp = board[r][c];
    board[r][c] = '#';
    boolean found = dfs(board, word, r + 1, c, i + 1) || dfs(board, word, r - 1, c, i + 1) || dfs(board, word, r, c + 1, i + 1) || dfs(board, word, r, c - 1, i + 1);
    board[r][c] = temp;
    return found;
}`,
      cpp: `bool exist(vector<vector<char>>& board, string word) {
    int rows = board.size(), cols = board[0].size();
    function<bool(int, int, int)> dfs = [&](int r, int c, int i) {
        if (i == word.size()) return true;
        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[i]) return false;
        char temp = board[r][c];
        board[r][c] = '#';
        bool found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
        board[r][c] = temp;
        return found;
    };
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }
    return false;
}`,
    },
  },
  {
    id: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function partition(s) {
  const res = [];
  function isPalin(str) {
    let l = 0, r = str.length - 1;
    while (l < r) if (str[l++] !== str[r--]) return false;
    return true;
  }
  function backtrack(start, curr) {
    if (start === s.length) { res.push([...curr]); return; }
    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.slice(start, end);
      if (isPalin(sub)) {
        curr.push(sub);
        backtrack(end, curr);
        curr.pop();
      }
    }
  }
  backtrack(0, []);
  return res;
}`,
      python: `def partition(s):
    res = []
    def isPalin(sub):
        return sub == sub[::-1]
    def backtrack(start, curr):
        if start == len(s):
            res.append(curr[:])
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if isPalin(sub):
                curr.append(sub)
                backtrack(end, curr)
                curr.pop()
    backtrack(0, [])
    return res`,
      java: `public List<List<String>> partition(String s) {
    List<List<String>> res = new ArrayList<>();
    backtrack(s, 0, new ArrayList<>(), res);
    return res;
}
void backtrack(String s, int start, List<String> curr, List<List<String>> res) {
    if (start == s.length()) { res.add(new ArrayList<>(curr)); return; }
    for (int end = start + 1; end <= s.length(); end++) {
        String sub = s.substring(start, end);
        if (isPalin(sub)) {
            curr.add(sub);
            backtrack(s, end, curr, res);
            curr.remove(curr.size() - 1);
        }
    }
}
boolean isPalin(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
    return true;
}`,
      cpp: `vector<vector<string>> partition(string s) {
    vector<vector<string>> res;
    vector<string> curr;
    function<bool(string&)> isPalin = [](string& str) {
        int l = 0, r = str.size() - 1;
        while (l < r) if (str[l++] != str[r--]) return false;
        return true;
    };
    function<void(int)> backtrack = [&](int start) {
        if (start == s.size()) { res.push_back(curr); return; }
        for (int end = start + 1; end <= s.size(); end++) {
            string sub = s.substr(start, end - start);
            if (isPalin(sub)) {
                curr.push_back(sub);
                backtrack(end);
                curr.pop_back();
            }
        }
    };
    backtrack(0);
    return res;
}`,
    },
  },
  {
    id: "letter-combinations",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "Backtracking",
    solutions: {
      javascript: `function letterCombinations(digits) {
  if (!digits) return [];
  const map = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
  const res = [];
  function backtrack(i, curr) {
    if (i === digits.length) { res.push(curr); return; }
    for (let c of map[digits[i]]) backtrack(i + 1, curr + c);
  }
  backtrack(0, '');
  return res;
}`,
      python: `def letterCombinations(digits):
    if not digits: return []
    mapping = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    res = []
    def backtrack(i, curr):
        if i == len(digits):
            res.append(curr)
            return
        for c in mapping[digits[i]]:
            backtrack(i + 1, curr + c)
    backtrack(0, '')
    return res`,
      java: `public List<String> letterCombinations(String digits) {
    List<String> res = new ArrayList<>();
    if (digits.isEmpty()) return res;
    String[] map = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    backtrack(digits, 0, "", res, map);
    return res;
}
void backtrack(String digits, int i, String curr, List<String> res, String[] map) {
    if (i == digits.length()) { res.add(curr); return; }
    for (char c : map[digits.charAt(i) - '0'].toCharArray()) {
        backtrack(digits, i + 1, curr + c, res, map);
    }
}`,
      cpp: `vector<string> letterCombinations(string digits) {
    if (digits.empty()) return {};
    vector<string> map = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    vector<string> res;
    function<void(int, string)> backtrack = [&](int i, string curr) {
        if (i == digits.size()) { res.push_back(curr); return; }
        for (char c : map[digits[i] - '0']) backtrack(i + 1, curr + c);
    };
    backtrack(0, "");
    return res;
}`,
    },
  },
  {
    id: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    category: "Backtracking",
    solutions: {
      javascript: `function solveNQueens(n) {
  const res = [], cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  function backtrack(row) {
    if (row === n) { res.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      board[row][col] = 'Q';
      backtrack(row + 1);
      board[row][col] = '.';
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }
  backtrack(0);
  return res;
}`,
      python: `def solveNQueens(n):
    res, cols, diag1, diag2 = [], set(), set(), set()
    board = [['.' for _ in range(n)] for _ in range(n)]
    def backtrack(row):
        if row == n:
            res.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or row - col in diag1 or row + col in diag2: continue
            cols.add(col); diag1.add(row - col); diag2.add(row + col)
            board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'
            cols.remove(col); diag1.remove(row - col); diag2.remove(row + col)
    backtrack(0)
    return res`,
      java: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> res = new ArrayList<>();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    backtrack(0, n, board, res, new HashSet<>(), new HashSet<>(), new HashSet<>());
    return res;
}
void backtrack(int row, int n, char[][] board, List<List<String>> res, Set<Integer> cols, Set<Integer> d1, Set<Integer> d2) {
    if (row == n) {
        List<String> solution = new ArrayList<>();
        for (char[] r : board) solution.add(new String(r));
        res.add(solution);
        return;
    }
    for (int col = 0; col < n; col++) {
        if (cols.contains(col) || d1.contains(row - col) || d2.contains(row + col)) continue;
        cols.add(col); d1.add(row - col); d2.add(row + col);
        board[row][col] = 'Q';
        backtrack(row + 1, n, board, res, cols, d1, d2);
        board[row][col] = '.';
        cols.remove(col); d1.remove(row - col); d2.remove(row + col);
    }
}`,
      cpp: `vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> res;
    vector<string> board(n, string(n, '.'));
    set<int> cols, diag1, diag2;
    function<void(int)> backtrack = [&](int row) {
        if (row == n) { res.push_back(board); return; }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col)) continue;
            cols.insert(col); diag1.insert(row - col); diag2.insert(row + col);
            board[row][col] = 'Q';
            backtrack(row + 1);
            board[row][col] = '.';
            cols.erase(col); diag1.erase(row - col); diag2.erase(row + col);
        }
    };
    backtrack(0);
    return res;
}`,
    },
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function cloneGraph(node) {
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
      python: `def cloneGraph(node):
    if not node: return None
    mapping = {}
    def dfs(n):
        if n in mapping: return mapping[n]
        copy = Node(n.val)
        mapping[n] = copy
        for nei in n.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy
    return dfs(node)`,
      java: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> map = new HashMap<>();
    return dfs(node, map);
}
Node dfs(Node node, Map<Node, Node> map) {
    if (map.containsKey(node)) return map.get(node);
    Node copy = new Node(node.val);
    map.put(node, copy);
    for (Node nei : node.neighbors) copy.neighbors.add(dfs(nei, map));
    return copy;
}`,
      cpp: `Node* cloneGraph(Node* node) {
    if (!node) return nullptr;
    unordered_map<Node*, Node*> map;
    function<Node*(Node*)> dfs = [&](Node* n) -> Node* {
        if (map.count(n)) return map[n];
        Node* copy = new Node(n->val);
        map[n] = copy;
        for (Node* nei : n->neighbors) copy->neighbors.push_back(dfs(nei));
        return copy;
    };
    return dfs(node);
}`,
    },
  },
  {
    id: "max-area-island",
    title: "Max Area of Island",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function maxAreaOfIsland(grid) {
  const rows = grid.length, cols = grid[0].length;
  let maxArea = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) maxArea = Math.max(maxArea, dfs(r, c));
    }
  }
  return maxArea;
}`,
      python: `def maxAreaOfIsland(grid):
    rows, cols = len(grid), len(grid[0])
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == 0: return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
    return max(dfs(r, c) for r in range(rows) for c in range(cols) if grid[r][c] == 1) if any(1 in row for row in grid) else 0`,
      java: `public int maxAreaOfIsland(int[][] grid) {
    int maxArea = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 1) maxArea = Math.max(maxArea, dfs(grid, r, c));
        }
    }
    return maxArea;
}
int dfs(int[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(grid, r + 1, c) + dfs(grid, r - 1, c) + dfs(grid, r, c + 1) + dfs(grid, r, c - 1);
}`,
      cpp: `int maxAreaOfIsland(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size(), maxArea = 0;
    function<int(int, int)> dfs = [&](int r, int c) -> int {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
    };
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 1) maxArea = max(maxArea, dfs(r, c));
        }
    }
    return maxArea;
}`,
    },
  },
  {
    id: "pacific-atlantic",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const pac = new Set(), atl = new Set();
  function dfs(r, c, visit, prev) {
    const key = r + ',' + c;
    if (r < 0 || c < 0 || r >= rows || c >= cols || visit.has(key) || heights[r][c] < prev) return;
    visit.add(key);
    dfs(r + 1, c, visit, heights[r][c]);
    dfs(r - 1, c, visit, heights[r][c]);
    dfs(r, c + 1, visit, heights[r][c]);
    dfs(r, c - 1, visit, heights[r][c]);
  }
  for (let r = 0; r < rows; r++) { dfs(r, 0, pac, 0); dfs(r, cols - 1, atl, 0); }
  for (let c = 0; c < cols; c++) { dfs(0, c, pac, 0); dfs(rows - 1, c, atl, 0); }
  const res = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pac.has(r + ',' + c) && atl.has(r + ',' + c)) res.push([r, c]);
    }
  }
  return res;
}`,
      python: `def pacificAtlantic(heights):
    rows, cols = len(heights), len(heights[0])
    pac, atl = set(), set()
    def dfs(r, c, visit, prev):
        if r < 0 or c < 0 or r >= rows or c >= cols or (r, c) in visit or heights[r][c] < prev: return
        visit.add((r, c))
        dfs(r + 1, c, visit, heights[r][c])
        dfs(r - 1, c, visit, heights[r][c])
        dfs(r, c + 1, visit, heights[r][c])
        dfs(r, c - 1, visit, heights[r][c])
    for r in range(rows):
        dfs(r, 0, pac, 0)
        dfs(r, cols - 1, atl, 0)
    for c in range(cols):
        dfs(0, c, pac, 0)
        dfs(rows - 1, c, atl, 0)
    return [[r, c] for r in range(rows) for c in range(cols) if (r, c) in pac and (r, c) in atl]`,
      java: `public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int rows = heights.length, cols = heights[0].length;
    boolean[][] pac = new boolean[rows][cols], atl = new boolean[rows][cols];
    for (int r = 0; r < rows; r++) { dfs(heights, r, 0, pac, 0); dfs(heights, r, cols - 1, atl, 0); }
    for (int c = 0; c < cols; c++) { dfs(heights, 0, c, pac, 0); dfs(heights, rows - 1, c, atl, 0); }
    List<List<Integer>> res = new ArrayList<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (pac[r][c] && atl[r][c]) res.add(Arrays.asList(r, c));
        }
    }
    return res;
}
void dfs(int[][] heights, int r, int c, boolean[][] visit, int prev) {
    if (r < 0 || c < 0 || r >= heights.length || c >= heights[0].length || visit[r][c] || heights[r][c] < prev) return;
    visit[r][c] = true;
    dfs(heights, r + 1, c, visit, heights[r][c]);
    dfs(heights, r - 1, c, visit, heights[r][c]);
    dfs(heights, r, c + 1, visit, heights[r][c]);
    dfs(heights, r, c - 1, visit, heights[r][c]);
}`,
      cpp: `vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    int rows = heights.size(), cols = heights[0].size();
    vector<vector<bool>> pac(rows, vector<bool>(cols)), atl(rows, vector<bool>(cols));
    function<void(int, int, vector<vector<bool>>&, int)> dfs = [&](int r, int c, vector<vector<bool>>& visit, int prev) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || visit[r][c] || heights[r][c] < prev) return;
        visit[r][c] = true;
        dfs(r + 1, c, visit, heights[r][c]);
        dfs(r - 1, c, visit, heights[r][c]);
        dfs(r, c + 1, visit, heights[r][c]);
        dfs(r, c - 1, visit, heights[r][c]);
    };
    for (int r = 0; r < rows; r++) { dfs(r, 0, pac, 0); dfs(r, cols - 1, atl, 0); }
    for (int c = 0; c < cols; c++) { dfs(0, c, pac, 0); dfs(rows - 1, c, atl, 0); }
    vector<vector<int>> res;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (pac[r][c] && atl[r][c]) res.push_back({r, c});
        }
    }
    return res;
}`,
    },
  },
  {
    id: "surrounded-regions",
    title: "Surrounded Regions",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function solve(board) {
  const rows = board.length, cols = board[0].length;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== 'O') return;
    board[r][c] = 'T';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols - 1); }
  for (let c = 0; c < cols; c++) { dfs(0, c); dfs(rows - 1, c); }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      if (board[r][c] === 'T') board[r][c] = 'O';
    }
  }
}`,
      python: `def solve(board):
    rows, cols = len(board), len(board[0])
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != 'O': return
        board[r][c] = 'T'
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    for r in range(rows):
        dfs(r, 0); dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c); dfs(rows - 1, c)
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == 'O': board[r][c] = 'X'
            if board[r][c] == 'T': board[r][c] = 'O'`,
      java: `public void solve(char[][] board) {
    int rows = board.length, cols = board[0].length;
    for (int r = 0; r < rows; r++) { dfs(board, r, 0); dfs(board, r, cols - 1); }
    for (int c = 0; c < cols; c++) { dfs(board, 0, c); dfs(board, rows - 1, c); }
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (board[r][c] == 'O') board[r][c] = 'X';
            if (board[r][c] == 'T') board[r][c] = 'O';
        }
    }
}
void dfs(char[][] board, int r, int c) {
    if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != 'O') return;
    board[r][c] = 'T';
    dfs(board, r + 1, c); dfs(board, r - 1, c); dfs(board, r, c + 1); dfs(board, r, c - 1);
}`,
      cpp: `void solve(vector<vector<char>>& board) {
    int rows = board.size(), cols = board[0].size();
    function<void(int, int)> dfs = [&](int r, int c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != 'O') return;
        board[r][c] = 'T';
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    };
    for (int r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols - 1); }
    for (int c = 0; c < cols; c++) { dfs(0, c); dfs(rows - 1, c); }
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (board[r][c] == 'O') board[r][c] = 'X';
            if (board[r][c] == 'T') board[r][c] = 'O';
        }
    }
}`,
    },
  },
  {
    id: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0, time = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length && fresh) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = queue.shift();
      for (let [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          queue.push([nr, nc]);
          fresh--;
        }
      }
    }
    time++;
  }
  return fresh ? -1 : time;
}`,
      python: `def orangesRotting(grid):
    from collections import deque
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = time = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: queue.append((r, c))
            if grid[r][c] == 1: fresh += 1
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    while queue and fresh:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    queue.append((nr, nc))
                    fresh -= 1
        time += 1
    return -1 if fresh else time`,
      java: `public int orangesRotting(int[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    int fresh = 0, time = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) queue.offer(new int[]{r, c});
            if (grid[r][c] == 1) fresh++;
        }
    }
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty() && fresh > 0) {
        int len = queue.size();
        for (int i = 0; i < len; i++) {
            int[] pos = queue.poll();
            for (int[] d : dirs) {
                int nr = pos[0] + d[0], nc = pos[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    queue.offer(new int[]{nr, nc});
                    fresh--;
                }
            }
        }
        time++;
    }
    return fresh > 0 ? -1 : time;
}`,
      cpp: `int orangesRotting(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int, int>> q;
    int fresh = 0, time = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) q.push({r, c});
            if (grid[r][c] == 1) fresh++;
        }
    }
    vector<pair<int, int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!q.empty() && fresh) {
        int len = q.size();
        for (int i = 0; i < len; i++) {
            auto [r, c] = q.front(); q.pop();
            for (auto [dr, dc] : dirs) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    q.push({nr, nc});
                    fresh--;
                }
            }
        }
        time++;
    }
    return fresh ? -1 : time;
}`,
    },
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const graph = new Map();
  for (let [a, b] of prerequisites) {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push(b);
  }
  const visit = new Set(), cycle = new Set();
  function dfs(course) {
    if (cycle.has(course)) return false;
    if (visit.has(course)) return true;
    cycle.add(course);
    for (let pre of graph.get(course) || []) {
      if (!dfs(pre)) return false;
    }
    cycle.delete(course);
    visit.add(course);
    return true;
  }
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
}`,
      python: `def canFinish(numCourses, prerequisites):
    graph = {i: [] for i in range(numCourses)}
    for a, b in prerequisites:
        graph[a].append(b)
    visit, cycle = set(), set()
    def dfs(course):
        if course in cycle: return False
        if course in visit: return True
        cycle.add(course)
        for pre in graph[course]:
            if not dfs(pre): return False
        cycle.remove(course)
        visit.add(course)
        return True
    return all(dfs(i) for i in range(numCourses))`,
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    for (int[] p : prerequisites) graph.get(p[0]).add(p[1]);
    int[] state = new int[numCourses];
    for (int i = 0; i < numCourses; i++) {
        if (!dfs(i, graph, state)) return false;
    }
    return true;
}
boolean dfs(int course, List<List<Integer>> graph, int[] state) {
    if (state[course] == 1) return false;
    if (state[course] == 2) return true;
    state[course] = 1;
    for (int pre : graph.get(course)) {
        if (!dfs(pre, graph, state)) return false;
    }
    state[course] = 2;
    return true;
}`,
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    for (auto& p : prerequisites) graph[p[0]].push_back(p[1]);
    vector<int> state(numCourses, 0);
    function<bool(int)> dfs = [&](int course) {
        if (state[course] == 1) return false;
        if (state[course] == 2) return true;
        state[course] = 1;
        for (int pre : graph[course]) {
            if (!dfs(pre)) return false;
        }
        state[course] = 2;
        return true;
    };
    for (int i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false;
    }
    return true;
}`,
    },
  },
  {
    id: "course-schedule-ii",
    title: "Course Schedule II",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function findOrder(numCourses, prerequisites) {
  const graph = new Map();
  for (let [a, b] of prerequisites) {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push(b);
  }
  const visit = new Set(), cycle = new Set(), res = [];
  function dfs(course) {
    if (cycle.has(course)) return false;
    if (visit.has(course)) return true;
    cycle.add(course);
    for (let pre of graph.get(course) || []) {
      if (!dfs(pre)) return false;
    }
    cycle.delete(course);
    visit.add(course);
    res.push(course);
    return true;
  }
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return [];
  }
  return res;
}`,
      python: `def findOrder(numCourses, prerequisites):
    graph = {i: [] for i in range(numCourses)}
    for a, b in prerequisites:
        graph[a].append(b)
    visit, cycle, res = set(), set(), []
    def dfs(course):
        if course in cycle: return False
        if course in visit: return True
        cycle.add(course)
        for pre in graph[course]:
            if not dfs(pre): return False
        cycle.remove(course)
        visit.add(course)
        res.append(course)
        return True
    for i in range(numCourses):
        if not dfs(i): return []
    return res`,
      java: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    for (int[] p : prerequisites) graph.get(p[0]).add(p[1]);
    int[] state = new int[numCourses];
    List<Integer> res = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) {
        if (!dfs(i, graph, state, res)) return new int[]{};
    }
    return res.stream().mapToInt(i -> i).toArray();
}
boolean dfs(int course, List<List<Integer>> graph, int[] state, List<Integer> res) {
    if (state[course] == 1) return false;
    if (state[course] == 2) return true;
    state[course] = 1;
    for (int pre : graph.get(course)) {
        if (!dfs(pre, graph, state, res)) return false;
    }
    state[course] = 2;
    res.add(course);
    return true;
}`,
      cpp: `vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    for (auto& p : prerequisites) graph[p[0]].push_back(p[1]);
    vector<int> state(numCourses, 0), res;
    function<bool(int)> dfs = [&](int course) {
        if (state[course] == 1) return false;
        if (state[course] == 2) return true;
        state[course] = 1;
        for (int pre : graph[course]) {
            if (!dfs(pre)) return false;
        }
        state[course] = 2;
        res.push_back(course);
        return true;
    };
    for (int i = 0; i < numCourses; i++) {
        if (!dfs(i)) return {};
    }
    return res;
}`,
    },
  },
  {
    id: "redundant-connection",
    title: "Redundant Connection",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function findRedundantConnection(edges) {
  const parent = [...Array(edges.length + 1).keys()];
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  for (let [u, v] of edges) {
    if (find(u) === find(v)) return [u, v];
    parent[find(u)] = find(v);
  }
}`,
      python: `def findRedundantConnection(edges):
    parent = list(range(len(edges) + 1))
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    for u, v in edges:
        if find(u) == find(v):
            return [u, v]
        parent[find(u)] = find(v)`,
      java: `public int[] findRedundantConnection(int[][] edges) {
    int[] parent = new int[edges.length + 1];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    for (int[] e : edges) {
        int u = find(parent, e[0]), v = find(parent, e[1]);
        if (u == v) return e;
        parent[u] = v;
    }
    return new int[]{};
}
int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      cpp: `vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    vector<int> parent(edges.size() + 1);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    };
    for (auto& e : edges) {
        int u = find(e[0]), v = find(e[1]);
        if (u == v) return e;
        parent[u] = v;
    }
    return {};
}`,
    },
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graphs",
    solutions: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  while (queue.length) {
    const [word, len] = queue.shift();
    if (word === endWord) return len;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (wordSet.has(newWord)) {
          queue.push([newWord, len + 1]);
          wordSet.delete(newWord);
        }
      }
    }
  }
  return 0;
}`,
      python: `def ladderLength(beginWord, endWord, wordList):
    from collections import deque
    wordSet = set(wordList)
    if endWord not in wordSet: return 0
    queue = deque([(beginWord, 1)])
    while queue:
        word, length = queue.popleft()
        if word == endWord: return length
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                newWord = word[:i] + c + word[i+1:]
                if newWord in wordSet:
                    queue.append((newWord, length + 1))
                    wordSet.remove(newWord)
    return 0`,
      java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int length = 1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            String word = queue.poll();
            if (word.equals(endWord)) return length;
            char[] chars = word.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                char orig = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String newWord = new String(chars);
                    if (wordSet.contains(newWord)) {
                        queue.offer(newWord);
                        wordSet.remove(newWord);
                    }
                }
                chars[j] = orig;
            }
        }
        length++;
    }
    return 0;
}`,
      cpp: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;
    queue<pair<string, int>> q;
    q.push({beginWord, 1});
    while (!q.empty()) {
        auto [word, len] = q.front(); q.pop();
        if (word == endWord) return len;
        for (int i = 0; i < word.size(); i++) {
            char orig = word[i];
            for (char c = 'a'; c <= 'z'; c++) {
                word[i] = c;
                if (wordSet.count(word)) {
                    q.push({word, len + 1});
                    wordSet.erase(word);
                }
            }
            word[i] = orig;
        }
    }
    return 0;
}`,
    },
  },
  {
    id: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  function robLinear(arr) {
    let prev = 0, curr = 0;
    for (let n of arr) [prev, curr] = [curr, Math.max(curr, prev + n)];
    return curr;
  }
  return Math.max(robLinear(nums.slice(1)), robLinear(nums.slice(0, -1)));
}`,
      python: `def rob(nums):
    if len(nums) == 1: return nums[0]
    def robLinear(arr):
        prev, curr = 0, 0
        for n in arr:
            prev, curr = curr, max(curr, prev + n)
        return curr
    return max(robLinear(nums[1:]), robLinear(nums[:-1]))`,
      java: `public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    return Math.max(robLinear(nums, 0, nums.length - 2), robLinear(nums, 1, nums.length - 1));
}
int robLinear(int[] nums, int start, int end) {
    int prev = 0, curr = 0;
    for (int i = start; i <= end; i++) {
        int temp = curr;
        curr = Math.max(curr, prev + nums[i]);
        prev = temp;
    }
    return curr;
}`,
      cpp: `int rob(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];
    auto robLinear = [](vector<int>& nums, int start, int end) {
        int prev = 0, curr = 0;
        for (int i = start; i <= end; i++) {
            int temp = curr;
            curr = max(curr, prev + nums[i]);
            prev = temp;
        }
        return curr;
    };
    return max(robLinear(nums, 0, nums.size() - 2), robLinear(nums, 1, nums.size() - 1));
}`,
    },
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function longestPalindrome(s) {
  let res = "";
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return s.slice(l + 1, r);
  }
  for (let i = 0; i < s.length; i++) {
    const odd = expand(i, i);
    const even = expand(i, i + 1);
    if (odd.length > res.length) res = odd;
    if (even.length > res.length) res = even;
  }
  return res;
}`,
      python: `def longestPalindrome(s):
    res = ""
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i + 1)
        if len(odd) > len(res): res = odd
        if len(even) > len(res): res = even
    return res`,
      java: `public String longestPalindrome(String s) {
    String res = "";
    for (int i = 0; i < s.length(); i++) {
        String odd = expand(s, i, i);
        String even = expand(s, i, i + 1);
        if (odd.length() > res.length()) res = odd;
        if (even.length() > res.length()) res = even;
    }
    return res;
}
String expand(String s, int l, int r) {
    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
    return s.substring(l + 1, r);
}`,
      cpp: `string longestPalindrome(string s) {
    string res;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) { l--; r++; }
        return s.substr(l + 1, r - l - 1);
    };
    for (int i = 0; i < s.size(); i++) {
        string odd = expand(i, i);
        string even = expand(i, i + 1);
        if (odd.size() > res.size()) res = odd;
        if (even.size() > res.size()) res = even;
    }
    return res;
}`,
    },
  },
  {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function countSubstrings(s) {
  let count = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { count++; l--; r++; }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}`,
      python: `def countSubstrings(s):
    count = 0
    def expand(l, r):
        nonlocal count
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)
    return count`,
      java: `public int countSubstrings(String s) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        count += expand(s, i, i);
        count += expand(s, i, i + 1);
    }
    return count;
}
int expand(String s, int l, int r) {
    int cnt = 0;
    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { cnt++; l--; r++; }
    return cnt;
}`,
      cpp: `int countSubstrings(string s) {
    int count = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < s.size() && s[l] == s[r]) { count++; l--; r++; }
    };
    for (int i = 0; i < s.size(); i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return count;
}`,
    },
  },
  {
    id: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function numDecodings(s) {
  if (s[0] === '0') return 0;
  let prev = 1, curr = 1;
  for (let i = 1; i < s.length; i++) {
    let temp = 0;
    if (s[i] !== '0') temp += curr;
    const two = parseInt(s.slice(i - 1, i + 1));
    if (two >= 10 && two <= 26) temp += prev;
    prev = curr;
    curr = temp;
  }
  return curr;
}`,
      python: `def numDecodings(s):
    if s[0] == '0': return 0
    prev, curr = 1, 1
    for i in range(1, len(s)):
        temp = 0
        if s[i] != '0': temp += curr
        two = int(s[i-1:i+1])
        if 10 <= two <= 26: temp += prev
        prev, curr = curr, temp
    return curr`,
      java: `public int numDecodings(String s) {
    if (s.charAt(0) == '0') return 0;
    int prev = 1, curr = 1;
    for (int i = 1; i < s.length(); i++) {
        int temp = 0;
        if (s.charAt(i) != '0') temp += curr;
        int two = Integer.parseInt(s.substring(i - 1, i + 1));
        if (two >= 10 && two <= 26) temp += prev;
        prev = curr;
        curr = temp;
    }
    return curr;
}`,
      cpp: `int numDecodings(string s) {
    if (s[0] == '0') return 0;
    int prev = 1, curr = 1;
    for (int i = 1; i < s.size(); i++) {
        int temp = 0;
        if (s[i] != '0') temp += curr;
        int two = stoi(s.substr(i - 1, 2));
        if (two >= 10 && two <= 26) temp += prev;
        prev = curr;
        curr = temp;
    }
    return curr;
}`,
    },
  },
  {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
      python: `def wordBreak(s, wordDict):
    wordSet = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in wordSet:
                dp[i] = True
                break
    return dp[len(s)]`,
      java: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> wordSet = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length()];
}`,
      cpp: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.size() + 1, false);
    dp[0] = true;
    for (int i = 1; i <= s.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.size()];
}`,
    },
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function lengthOfLIS(nums) {
  const dp = [];
  for (let num of nums) {
    let lo = 0, hi = dp.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (dp[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    dp[lo] = num;
  }
  return dp.length;
}`,
      python: `def lengthOfLIS(nums):
    from bisect import bisect_left
    dp = []
    for num in nums:
        idx = bisect_left(dp, num)
        if idx == len(dp):
            dp.append(num)
        else:
            dp[idx] = num
    return len(dp)`,
      java: `public int lengthOfLIS(int[] nums) {
    List<Integer> dp = new ArrayList<>();
    for (int num : nums) {
        int idx = Collections.binarySearch(dp, num);
        if (idx < 0) idx = -(idx + 1);
        if (idx == dp.size()) dp.add(num);
        else dp.set(idx, num);
    }
    return dp.size();
}`,
      cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> dp;
    for (int num : nums) {
        auto it = lower_bound(dp.begin(), dp.end(), num);
        if (it == dp.end()) dp.push_back(num);
        else *it = num;
    }
    return dp.size();
}`,
    },
  },
  {
    id: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  const dp = new Set([0]);
  for (let num of nums) {
    const next = new Set(dp);
    for (let val of dp) {
      if (val + num === target) return true;
      next.add(val + num);
    }
    dp.clear();
    for (let v of next) dp.add(v);
  }
  return dp.has(target);
}`,
      python: `def canPartition(nums):
    total = sum(nums)
    if total % 2: return False
    target = total // 2
    dp = {0}
    for num in nums:
        dp = {s + num for s in dp} | dp
        if target in dp: return True
    return target in dp`,
      java: `public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int n : nums) sum += n;
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int num : nums) {
        for (int i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
        if (dp[target]) return true;
    }
    return dp[target];
}`,
      cpp: `bool canPartition(vector<int>& nums) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if (sum % 2) return false;
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums) {
        for (int i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
        if (dp[target]) return true;
    }
    return dp[target];
}`,
    },
  },
  {
    id: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
      python: `def uniquePaths(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[-1]`,
      java: `public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}`,
      cpp: `int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}`,
    },
  },
  {
    id: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    let prev = 0;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (text1[i - 1] === text2[j - 1]) dp[j] = prev + 1;
      else dp[j] = Math.max(dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}`,
      python: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [0] * (n + 1)
    for i in range(1, m + 1):
        prev = 0
        for j in range(1, n + 1):
            temp = dp[j]
            if text1[i - 1] == text2[j - 1]:
                dp[j] = prev + 1
            else:
                dp[j] = max(dp[j], dp[j - 1])
            prev = temp
    return dp[n]`,
      java: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[] dp = new int[n + 1];
    for (int i = 1; i <= m; i++) {
        int prev = 0;
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[j] = prev + 1;
            else dp[j] = Math.max(dp[j], dp[j - 1]);
            prev = temp;
        }
    }
    return dp[n];
}`,
      cpp: `int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= m; i++) {
        int prev = 0;
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            if (text1[i - 1] == text2[j - 1]) dp[j] = prev + 1;
            else dp[j] = max(dp[j], dp[j - 1]);
            prev = temp;
        }
    }
    return dp[n];
}`,
    },
  },
  {
    id: "target-sum",
    title: "Target Sum",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function findTargetSumWays(nums, target) {
  let dp = new Map([[0, 1]]);
  for (let num of nums) {
    const next = new Map();
    for (let [sum, count] of dp) {
      next.set(sum + num, (next.get(sum + num) || 0) + count);
      next.set(sum - num, (next.get(sum - num) || 0) + count);
    }
    dp = next;
  }
  return dp.get(target) || 0;
}`,
      python: `def findTargetSumWays(nums, target):
    from collections import defaultdict
    dp = defaultdict(int)
    dp[0] = 1
    for num in nums:
        nxt = defaultdict(int)
        for s, cnt in dp.items():
            nxt[s + num] += cnt
            nxt[s - num] += cnt
        dp = nxt
    return dp[target]`,
      java: `public int findTargetSumWays(int[] nums, int target) {
    Map<Integer, Integer> dp = new HashMap<>();
    dp.put(0, 1);
    for (int num : nums) {
        Map<Integer, Integer> next = new HashMap<>();
        for (var e : dp.entrySet()) {
            int sum = e.getKey(), count = e.getValue();
            next.merge(sum + num, count, Integer::sum);
            next.merge(sum - num, count, Integer::sum);
        }
        dp = next;
    }
    return dp.getOrDefault(target, 0);
}`,
      cpp: `int findTargetSumWays(vector<int>& nums, int target) {
    unordered_map<int, int> dp;
    dp[0] = 1;
    for (int num : nums) {
        unordered_map<int, int> next;
        for (auto& [sum, count] : dp) {
            next[sum + num] += count;
            next[sum - num] += count;
        }
        dp = next;
    }
    return dp[target];
}`,
    },
  },
  {
    id: "interleaving-string",
    title: "Interleaving String",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function isInterleave(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  const dp = Array(s2.length + 1).fill(false);
  for (let i = 0; i <= s1.length; i++) {
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0 && j === 0) dp[j] = true;
      else if (i === 0) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
      else if (j === 0) dp[j] = dp[j] && s1[i - 1] === s3[i - 1];
      else dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[s2.length];
}`,
      python: `def isInterleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3): return False
    dp = [False] * (len(s2) + 1)
    for i in range(len(s1) + 1):
        for j in range(len(s2) + 1):
            if i == 0 and j == 0: dp[j] = True
            elif i == 0: dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
            elif j == 0: dp[j] = dp[j] and s1[i - 1] == s3[i - 1]
            else: dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
    return dp[len(s2)]`,
      java: `public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    boolean[] dp = new boolean[s2.length() + 1];
    for (int i = 0; i <= s1.length(); i++) {
        for (int j = 0; j <= s2.length(); j++) {
            if (i == 0 && j == 0) dp[j] = true;
            else if (i == 0) dp[j] = dp[j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
            else if (j == 0) dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(i - 1);
            else dp[j] = (dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) || (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
        }
    }
    return dp[s2.length()];
}`,
      cpp: `bool isInterleave(string s1, string s2, string s3) {
    if (s1.size() + s2.size() != s3.size()) return false;
    vector<bool> dp(s2.size() + 1, false);
    for (int i = 0; i <= s1.size(); i++) {
        for (int j = 0; j <= s2.size(); j++) {
            if (i == 0 && j == 0) dp[j] = true;
            else if (i == 0) dp[j] = dp[j - 1] && s2[j - 1] == s3[j - 1];
            else if (j == 0) dp[j] = dp[j] && s1[i - 1] == s3[i - 1];
            else dp[j] = (dp[j] && s1[i - 1] == s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] == s3[i + j - 1]);
        }
    }
    return dp[s2.size()];
}`,
    },
  },
  {
    id: "edit-distance",
    title: "Edit Distance",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  let dp = [...Array(n + 1).keys()];
  for (let i = 1; i <= m; i++) {
    const next = [i];
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) next[j] = dp[j - 1];
      else next[j] = 1 + Math.min(dp[j], next[j - 1], dp[j - 1]);
    }
    dp = next;
  }
  return dp[n];
}`,
      python: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = list(range(n + 1))
    for i in range(1, m + 1):
        nxt = [i] + [0] * n
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                nxt[j] = dp[j - 1]
            else:
                nxt[j] = 1 + min(dp[j], nxt[j - 1], dp[j - 1])
        dp = nxt
    return dp[n]`,
      java: `public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[] dp = new int[n + 1];
    for (int j = 0; j <= n; j++) dp[j] = j;
    for (int i = 1; i <= m; i++) {
        int[] next = new int[n + 1];
        next[0] = i;
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) next[j] = dp[j - 1];
            else next[j] = 1 + Math.min(dp[j], Math.min(next[j - 1], dp[j - 1]));
        }
        dp = next;
    }
    return dp[n];
}`,
      cpp: `int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<int> dp(n + 1);
    iota(dp.begin(), dp.end(), 0);
    for (int i = 1; i <= m; i++) {
        vector<int> next(n + 1);
        next[0] = i;
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) next[j] = dp[j - 1];
            else next[j] = 1 + min({dp[j], next[j - 1], dp[j - 1]});
        }
        dp = next;
    }
    return dp[n];
}`,
    },
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0], curr = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    maxSum = Math.max(maxSum, curr);
  }
  return maxSum;
}`,
      python: `def maxSubArray(nums):
    maxSum = curr = nums[0]
    for n in nums[1:]:
        curr = max(n, curr + n)
        maxSum = max(maxSum, curr)
    return maxSum`,
      java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0], curr = nums[0];
    for (int i = 1; i < nums.length; i++) {
        curr = Math.max(nums[i], curr + nums[i]);
        maxSum = Math.max(maxSum, curr);
    }
    return maxSum;
}`,
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], curr = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        curr = max(nums[i], curr + nums[i]);
        maxSum = max(maxSum, curr);
    }
    return maxSum;
}`,
    },
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i <= reach && i < nums.length; i++) {
    reach = Math.max(reach, i + nums[i]);
    if (reach >= nums.length - 1) return true;
  }
  return false;
}`,
      python: `def canJump(nums):
    reach = 0
    for i in range(len(nums)):
        if i > reach: return False
        reach = max(reach, i + nums[i])
    return True`,
      java: `public boolean canJump(int[] nums) {
    int reach = 0;
    for (int i = 0; i <= reach && i < nums.length; i++) {
        reach = Math.max(reach, i + nums[i]);
        if (reach >= nums.length - 1) return true;
    }
    return false;
}`,
      cpp: `bool canJump(vector<int>& nums) {
    int reach = 0;
    for (int i = 0; i <= reach && i < nums.size(); i++) {
        reach = max(reach, i + nums[i]);
        if (reach >= nums.size() - 1) return true;
    }
    return false;
}`,
    },
  },
  {
    id: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function jump(nums) {
  let jumps = 0, curr = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curr) {
      jumps++;
      curr = farthest;
    }
  }
  return jumps;
}`,
      python: `def jump(nums):
    jumps = curr = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == curr:
            jumps += 1
            curr = farthest
    return jumps`,
      java: `public int jump(int[] nums) {
    int jumps = 0, curr = 0, farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == curr) {
            jumps++;
            curr = farthest;
        }
    }
    return jumps;
}`,
      cpp: `int jump(vector<int>& nums) {
    int jumps = 0, curr = 0, farthest = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == curr) {
            jumps++;
            curr = farthest;
        }
    }
    return jumps;
}`,
    },
  },
  {
    id: "gas-station",
    title: "Gas Station",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function canCompleteCircuit(gas, cost) {
  let total = 0, curr = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i];
    curr += gas[i] - cost[i];
    if (curr < 0) {
      start = i + 1;
      curr = 0;
    }
  }
  return total >= 0 ? start : -1;
}`,
      python: `def canCompleteCircuit(gas, cost):
    total = curr = start = 0
    for i in range(len(gas)):
        total += gas[i] - cost[i]
        curr += gas[i] - cost[i]
        if curr < 0:
            start = i + 1
            curr = 0
    return start if total >= 0 else -1`,
      java: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int total = 0, curr = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        total += gas[i] - cost[i];
        curr += gas[i] - cost[i];
        if (curr < 0) {
            start = i + 1;
            curr = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
      cpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total = 0, curr = 0, start = 0;
    for (int i = 0; i < gas.size(); i++) {
        total += gas[i] - cost[i];
        curr += gas[i] - cost[i];
        if (curr < 0) {
            start = i + 1;
            curr = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
    },
  },
  {
    id: "hand-of-straights",
    title: "Hand of Straights",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map();
  for (let h of hand) count.set(h, (count.get(h) || 0) + 1);
  const sorted = [...count.keys()].sort((a, b) => a - b);
  for (let start of sorted) {
    const cnt = count.get(start) || 0;
    if (cnt === 0) continue;
    for (let i = 0; i < groupSize; i++) {
      const curr = count.get(start + i) || 0;
      if (curr < cnt) return false;
      count.set(start + i, curr - cnt);
    }
  }
  return true;
}`,
      python: `def isNStraightHand(hand, groupSize):
    from collections import Counter
    if len(hand) % groupSize: return False
    count = Counter(hand)
    for start in sorted(count):
        cnt = count[start]
        if cnt == 0: continue
        for i in range(groupSize):
            if count[start + i] < cnt: return False
            count[start + i] -= cnt
    return True`,
      java: `public boolean isNStraightHand(int[] hand, int groupSize) {
    if (hand.length % groupSize != 0) return false;
    TreeMap<Integer, Integer> count = new TreeMap<>();
    for (int h : hand) count.merge(h, 1, Integer::sum);
    while (!count.isEmpty()) {
        int start = count.firstKey();
        int cnt = count.get(start);
        for (int i = 0; i < groupSize; i++) {
            int curr = count.getOrDefault(start + i, 0);
            if (curr < cnt) return false;
            if (curr == cnt) count.remove(start + i);
            else count.put(start + i, curr - cnt);
        }
    }
    return true;
}`,
      cpp: `bool isNStraightHand(vector<int>& hand, int groupSize) {
    if (hand.size() % groupSize) return false;
    map<int, int> count;
    for (int h : hand) count[h]++;
    for (auto& [start, cnt] : count) {
        if (cnt == 0) continue;
        for (int i = 0; i < groupSize; i++) {
            if (count[start + i] < cnt) return false;
            count[start + i] -= cnt;
        }
    }
    return true;
}`,
    },
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    solutions: {
      javascript: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= res[res.length - 1][1]) {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}`,
      python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    res = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= res[-1][1]:
            res[-1][1] = max(res[-1][1], end)
        else:
            res.append([start, end])
    return res`,
      java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> res = new ArrayList<>();
    res.add(intervals[0]);
    for (int i = 1; i < intervals.length; i++) {
        int[] last = res.get(res.size() - 1);
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            res.add(intervals[i]);
        }
    }
    return res.toArray(new int[0][]);
}`,
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res = {intervals[0]};
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= res.back()[1]) {
            res.back()[1] = max(res.back()[1], intervals[i][1]);
        } else {
            res.push_back(intervals[i]);
        }
    }
    return res;
}`,
    },
  },
  {
    id: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    category: "Intervals",
    solutions: {
      javascript: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < intervals.length) res.push(intervals[i++]);
  return res;
}`,
      python: `def insert(intervals, newInterval):
    res, i = [], 0
    while i < len(intervals) and intervals[i][1] < newInterval[0]:
        res.append(intervals[i])
        i += 1
    while i < len(intervals) and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    res.append(newInterval)
    res.extend(intervals[i:])
    return res`,
      java: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> res = new ArrayList<>();
    int i = 0;
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        res.add(intervals[i++]);
    }
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.add(newInterval);
    while (i < intervals.length) res.add(intervals[i++]);
    return res.toArray(new int[0][]);
}`,
      cpp: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> res;
    int i = 0;
    while (i < intervals.size() && intervals[i][1] < newInterval[0]) {
        res.push_back(intervals[i++]);
    }
    while (i < intervals.size() && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push_back(newInterval);
    while (i < intervals.size()) res.push_back(intervals[i++]);
    return res;
}`,
    },
  },
  {
    id: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Intervals",
    solutions: {
      javascript: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, end = -Infinity;
  for (let [s, e] of intervals) {
    if (s >= end) end = e;
    else count++;
  }
  return count;
}`,
      python: `def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count, end = 0, float('-inf')
    for s, e in intervals:
        if s >= end: end = e
        else: count += 1
    return count`,
      java: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
    int count = 0, end = Integer.MIN_VALUE;
    for (int[] interval : intervals) {
        if (interval[0] >= end) end = interval[1];
        else count++;
    }
    return count;
}`,
      cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
    int count = 0, end = INT_MIN;
    for (auto& interval : intervals) {
        if (interval[0] >= end) end = interval[1];
        else count++;
    }
    return count;
}`,
    },
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    difficulty: "Easy",
    category: "Intervals",
    solutions: {
      javascript: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}`,
      python: `def canAttendMeetings(intervals):
    intervals.sort()
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]: return False
    return True`,
      java: `public boolean canAttendMeetings(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}`,
      cpp: `bool canAttendMeetings(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}`,
    },
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    category: "Intervals",
    solutions: {
      javascript: `function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  let rooms = 0, endPtr = 0;
  for (let start of starts) {
    if (start < ends[endPtr]) rooms++;
    else endPtr++;
  }
  return rooms;
}`,
      python: `def minMeetingRooms(intervals):
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    rooms = endPtr = 0
    for start in starts:
        if start < ends[endPtr]: rooms += 1
        else: endPtr += 1
    return rooms`,
      java: `public int minMeetingRooms(int[][] intervals) {
    int[] starts = new int[intervals.length];
    int[] ends = new int[intervals.length];
    for (int i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    Arrays.sort(starts);
    Arrays.sort(ends);
    int rooms = 0, endPtr = 0;
    for (int start : starts) {
        if (start < ends[endPtr]) rooms++;
        else endPtr++;
    }
    return rooms;
}`,
      cpp: `int minMeetingRooms(vector<vector<int>>& intervals) {
    vector<int> starts, ends;
    for (auto& i : intervals) {
        starts.push_back(i[0]);
        ends.push_back(i[1]);
    }
    sort(starts.begin(), starts.end());
    sort(ends.begin(), ends.end());
    int rooms = 0, endPtr = 0;
    for (int start : starts) {
        if (start < ends[endPtr]) rooms++;
        else endPtr++;
    }
    return rooms;
}`,
    },
  },
  {
    id: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Math & Geometry",
    solutions: {
      javascript: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let row of matrix) row.reverse();
}`,
      python: `def rotate(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()`,
      java: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (int[] row : matrix) {
        int l = 0, r = n - 1;
        while (l < r) {
            int temp = row[l];
            row[l++] = row[r];
            row[r--] = temp;
        }
    }
}`,
      cpp: `void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    for (auto& row : matrix) reverse(row.begin(), row.end());
}`,
    },
  },
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Math & Geometry",
    solutions: {
      javascript: `function spiralOrder(matrix) {
  const res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
      python: `def spiralOrder(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1): res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1): res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1): res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1): res.append(matrix[r][left])
            left += 1
    return res`,
      java: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> res = new ArrayList<>();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) res.add(matrix[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) res.add(matrix[r][right]);
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) res.add(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) res.add(matrix[r][left]);
            left++;
        }
    }
    return res;
}`,
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> res;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) res.push_back(matrix[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) res.push_back(matrix[r][right]);
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) res.push_back(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) res.push_back(matrix[r][left]);
            left++;
        }
    }
    return res;
}`,
    },
  },
  {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Math & Geometry",
    solutions: {
      javascript: `function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  for (let c = 0; c < n; c++) if (matrix[0][c] === 0) firstRowZero = true;
  for (let r = 0; r < m; r++) if (matrix[r][0] === 0) firstColZero = true;
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[0][c] = 0;
        matrix[r][0] = 0;
      }
    }
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[0][c] === 0 || matrix[r][0] === 0) matrix[r][c] = 0;
    }
  }
  if (firstRowZero) for (let c = 0; c < n; c++) matrix[0][c] = 0;
  if (firstColZero) for (let r = 0; r < m; r++) matrix[r][0] = 0;
}`,
      python: `def setZeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    firstRowZero = any(matrix[0][c] == 0 for c in range(n))
    firstColZero = any(matrix[r][0] == 0 for r in range(m))
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[0][c] = matrix[r][0] = 0
    for r in range(1, m):
        for c in range(1, n):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0
    if firstRowZero:
        for c in range(n): matrix[0][c] = 0
    if firstColZero:
        for r in range(m): matrix[r][0] = 0`,
      java: `public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean firstRowZero = false, firstColZero = false;
    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) firstRowZero = true;
    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) firstColZero = true;
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            if (matrix[r][c] == 0) {
                matrix[0][c] = 0;
                matrix[r][0] = 0;
            }
        }
    }
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            if (matrix[0][c] == 0 || matrix[r][0] == 0) matrix[r][c] = 0;
        }
    }
    if (firstRowZero) for (int c = 0; c < n; c++) matrix[0][c] = 0;
    if (firstColZero) for (int r = 0; r < m; r++) matrix[r][0] = 0;
}`,
      cpp: `void setZeroes(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    bool firstRowZero = false, firstColZero = false;
    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) firstRowZero = true;
    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) firstColZero = true;
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            if (matrix[r][c] == 0) {
                matrix[0][c] = 0;
                matrix[r][0] = 0;
            }
        }
    }
    for (int r = 1; r < m; r++) {
        for (int c = 1; c < n; c++) {
            if (matrix[0][c] == 0 || matrix[r][0] == 0) matrix[r][c] = 0;
        }
    }
    if (firstRowZero) for (int c = 0; c < n; c++) matrix[0][c] = 0;
    if (firstColZero) for (int r = 0; r < m; r++) matrix[r][0] = 0;
}`,
    },
  },
  {
    id: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    category: "Math & Geometry",
    solutions: {
      javascript: `function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let sum = 0;
    while (n > 0) {
      sum += (n % 10) ** 2;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n === 1;
}`,
      python: `def isHappy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1`,
      java: `public boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    while (n != 1 && !seen.contains(n)) {
        seen.add(n);
        int sum = 0;
        while (n > 0) {
            sum += (n % 10) * (n % 10);
            n /= 10;
        }
        n = sum;
    }
    return n == 1;
}`,
      cpp: `bool isHappy(int n) {
    unordered_set<int> seen;
    while (n != 1 && !seen.count(n)) {
        seen.insert(n);
        int sum = 0;
        while (n > 0) {
            sum += (n % 10) * (n % 10);
            n /= 10;
        }
        n = sum;
    }
    return n == 1;
}`,
    },
  },
  {
    id: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    category: "Math & Geometry",
    solutions: {
      javascript: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,
      python: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
      java: `public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    int[] res = new int[digits.length + 1];
    res[0] = 1;
    return res;
}`,
      cpp: `vector<int> plusOne(vector<int>& digits) {
    for (int i = digits.size() - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.insert(digits.begin(), 1);
    return digits;
}`,
    },
  },
  {
    id: "pow-x-n",
    title: "Pow(x, n)",
    difficulty: "Medium",
    category: "Math & Geometry",
    solutions: {
      javascript: `function myPow(x, n) {
  if (n < 0) { x = 1 / x; n = -n; }
  let res = 1;
  while (n > 0) {
    if (n % 2 === 1) res *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return res;
}`,
      python: `def myPow(x, n):
    if n < 0: x, n = 1 / x, -n
    res = 1
    while n:
        if n % 2: res *= x
        x *= x
        n //= 2
    return res`,
      java: `public double myPow(double x, int n) {
    long N = n;
    if (N < 0) { x = 1 / x; N = -N; }
    double res = 1;
    while (N > 0) {
        if (N % 2 == 1) res *= x;
        x *= x;
        N /= 2;
    }
    return res;
}`,
      cpp: `double myPow(double x, int n) {
    long N = n;
    if (N < 0) { x = 1 / x; N = -N; }
    double res = 1;
    while (N > 0) {
        if (N % 2 == 1) res *= x;
        x *= x;
        N /= 2;
    }
    return res;
}`,
    },
  },
  {
    id: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function singleNumber(nums) {
  return nums.reduce((a, b) => a ^ b, 0);
}`,
      python: `def singleNumber(nums):
    res = 0
    for n in nums: res ^= n
    return res`,
      java: `public int singleNumber(int[] nums) {
    int res = 0;
    for (int n : nums) res ^= n;
    return res;
}`,
      cpp: `int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int n : nums) res ^= n;
    return res;
}`,
    },
  },
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function hammingWeight(n) {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
}`,
      python: `def hammingWeight(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count`,
      java: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}`,
      cpp: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}`,
    },
  },
  {
    id: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function countBits(n) {
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp;
}`,
      python: `def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
      java: `public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}`,
      cpp: `vector<int> countBits(int n) {
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}`,
    },
  },
  {
    id: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function reverseBits(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res << 1) | (n & 1);
    n >>>= 1;
  }
  return res >>> 0;
}`,
      python: `def reverseBits(n):
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
      java: `public int reverseBits(int n) {
    int res = 0;
    for (int i = 0; i < 32; i++) {
        res = (res << 1) | (n & 1);
        n >>>= 1;
    }
    return res;
}`,
      cpp: `uint32_t reverseBits(uint32_t n) {
    uint32_t res = 0;
    for (int i = 0; i < 32; i++) {
        res = (res << 1) | (n & 1);
        n >>= 1;
    }
    return res;
}`,
    },
  },
  {
    id: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function missingNumber(nums) {
  let res = nums.length;
  for (let i = 0; i < nums.length; i++) {
    res ^= i ^ nums[i];
  }
  return res;
}`,
      python: `def missingNumber(nums):
    res = len(nums)
    for i, n in enumerate(nums):
        res ^= i ^ n
    return res`,
      java: `public int missingNumber(int[] nums) {
    int res = nums.length;
    for (int i = 0; i < nums.length; i++) {
        res ^= i ^ nums[i];
    }
    return res;
}`,
      cpp: `int missingNumber(vector<int>& nums) {
    int res = nums.size();
    for (int i = 0; i < nums.size(); i++) {
        res ^= i ^ nums[i];
    }
    return res;
}`,
    },
  },
  {
    id: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
      python: `def getSum(a, b):
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a if b == 0 else a & mask`,
      java: `public int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
      cpp: `int getSum(int a, int b) {
    while (b != 0) {
        int carry = (unsigned)(a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
    },
  },
  {
    id: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Bit Manipulation",
    solutions: {
      javascript: `function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  let res = parseInt(Math.abs(x).toString().split('').reverse().join('')) * sign;
  return res < -(2 ** 31) || res > 2 ** 31 - 1 ? 0 : res;
}`,
      python: `def reverse(x):
    sign = -1 if x < 0 else 1
    res = sign * int(str(abs(x))[::-1])
    return res if -2**31 <= res <= 2**31 - 1 else 0`,
      java: `public int reverse(int x) {
    long res = 0;
    while (x != 0) {
        res = res * 10 + x % 10;
        x /= 10;
    }
    return res < Integer.MIN_VALUE || res > Integer.MAX_VALUE ? 0 : (int) res;
}`,
      cpp: `int reverse(int x) {
    long res = 0;
    while (x != 0) {
        res = res * 10 + x % 10;
        x /= 10;
    }
    return (res < INT_MIN || res > INT_MAX) ? 0 : res;
}`,
    },
  },
  {
    id: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    category: "1-D DP",
    solutions: {
      javascript: `function minCostClimbingStairs(cost) {
  for (let i = 2; i < cost.length; i++) {
    cost[i] += Math.min(cost[i - 1], cost[i - 2]);
  }
  return Math.min(cost[cost.length - 1], cost[cost.length - 2]);
}`,
      python: `def minCostClimbingStairs(cost):
    for i in range(2, len(cost)):
        cost[i] += min(cost[i - 1], cost[i - 2])
    return min(cost[-1], cost[-2])`,
      java: `public int minCostClimbingStairs(int[] cost) {
    for (int i = 2; i < cost.length; i++) {
        cost[i] += Math.min(cost[i - 1], cost[i - 2]);
    }
    return Math.min(cost[cost.length - 1], cost[cost.length - 2]);
}`,
      cpp: `int minCostClimbingStairs(vector<int>& cost) {
    for (int i = 2; i < cost.size(); i++) {
        cost[i] += min(cost[i - 1], cost[i - 2]);
    }
    return min(cost[cost.size() - 1], cost[cost.size() - 2]);
}`,
    },
  },
  {
    id: "valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const parent = [...Array(n).keys()];
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  for (let [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return false;
    parent[pu] = pv;
  }
  return true;
}`,
      python: `def validTree(n, edges):
    if len(edges) != n - 1: return False
    parent = list(range(n))
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    for u, v in edges:
        pu, pv = find(u), find(v)
        if pu == pv: return False
        parent[pu] = pv
    return True`,
      java: `public boolean validTree(int n, int[][] edges) {
    if (edges.length != n - 1) return false;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] e : edges) {
        int pu = find(parent, e[0]), pv = find(parent, e[1]);
        if (pu == pv) return false;
        parent[pu] = pv;
    }
    return true;
}
int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      cpp: `bool validTree(int n, vector<vector<int>>& edges) {
    if (edges.size() != n - 1) return false;
    vector<int> parent(n);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    };
    for (auto& e : edges) {
        int pu = find(e[0]), pv = find(e[1]);
        if (pu == pv) return false;
        parent[pu] = pv;
    }
    return true;
}`,
    },
  },
  {
    id: "number-connected-components",
    title: "Number of Connected Components",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function countComponents(n, edges) {
  const parent = [...Array(n).keys()];
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  let count = n;
  for (let [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu !== pv) {
      parent[pu] = pv;
      count--;
    }
  }
  return count;
}`,
      python: `def countComponents(n, edges):
    parent = list(range(n))
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    count = n
    for u, v in edges:
        pu, pv = find(u), find(v)
        if pu != pv:
            parent[pu] = pv
            count -= 1
    return count`,
      java: `public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int count = n;
    for (int[] e : edges) {
        int pu = find(parent, e[0]), pv = find(parent, e[1]);
        if (pu != pv) {
            parent[pu] = pv;
            count--;
        }
    }
    return count;
}
int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      cpp: `int countComponents(int n, vector<vector<int>>& edges) {
    vector<int> parent(n);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    };
    int count = n;
    for (auto& e : edges) {
        int pu = find(e[0]), pv = find(e[1]);
        if (pu != pv) {
            parent[pu] = pv;
            count--;
        }
    }
    return count;
}`,
    },
  },
  {
    id: "walls-and-gates",
    title: "Walls and Gates",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function wallsAndGates(rooms) {
  const rows = rooms.length, cols = rooms[0].length;
  const queue = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rooms[r][c] === 0) queue.push([r, c]);
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length) {
    const [r, c] = queue.shift();
    for (let [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && rooms[nr][nc] === 2147483647) {
        rooms[nr][nc] = rooms[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
}`,
      python: `def wallsAndGates(rooms):
    from collections import deque
    rows, cols = len(rooms), len(rooms[0])
    queue = deque()
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                queue.append((r, c))
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    while queue:
        r, c = queue.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == 2147483647:
                rooms[nr][nc] = rooms[r][c] + 1
                queue.append((nr, nc))`,
      java: `public void wallsAndGates(int[][] rooms) {
    int rows = rooms.length, cols = rooms[0].length;
    Queue<int[]> queue = new LinkedList<>();
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (rooms[r][c] == 0) queue.offer(new int[]{r, c});
        }
    }
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!queue.isEmpty()) {
        int[] pos = queue.poll();
        for (int[] d : dirs) {
            int nr = pos[0] + d[0], nc = pos[1] + d[1];
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && rooms[nr][nc] == Integer.MAX_VALUE) {
                rooms[nr][nc] = rooms[pos[0]][pos[1]] + 1;
                queue.offer(new int[]{nr, nc});
            }
        }
    }
}`,
      cpp: `void wallsAndGates(vector<vector<int>>& rooms) {
    int rows = rooms.size(), cols = rooms[0].size();
    queue<pair<int,int>> q;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (rooms[r][c] == 0) q.push({r, c});
        }
    }
    vector<pair<int,int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && rooms[nr][nc] == INT_MAX) {
                rooms[nr][nc] = rooms[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
}`,
    },
  },
  {
    id: "swim-in-rising-water",
    title: "Swim in Rising Water",
    difficulty: "Hard",
    category: "Graphs",
    solutions: {
      javascript: `function swimInWater(grid) {
  const n = grid.length;
  const heap = [[grid[0][0], 0, 0]];
  const visited = new Set(['0,0']);
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [t, r, c] = heap.shift();
    if (r === n - 1 && c === n - 1) return t;
    for (let [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      const key = nr + ',' + nc;
      if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited.has(key)) {
        visited.add(key);
        heap.push([Math.max(t, grid[nr][nc]), nr, nc]);
      }
    }
  }
}`,
      python: `def swimInWater(grid):
    import heapq
    n = len(grid)
    heap = [(grid[0][0], 0, 0)]
    visited = {(0, 0)}
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    while heap:
        t, r, c = heapq.heappop(heap)
        if r == n - 1 and c == n - 1:
            return t
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                visited.add((nr, nc))
                heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))`,
      java: `public int swimInWater(int[][] grid) {
    int n = grid.length;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{grid[0][0], 0, 0});
    boolean[][] visited = new boolean[n][n];
    visited[0][0] = true;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int t = curr[0], r = curr[1], c = curr[2];
        if (r == n - 1 && c == n - 1) return t;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc]) {
                visited[nr][nc] = true;
                pq.offer(new int[]{Math.max(t, grid[nr][nc]), nr, nc});
            }
        }
    }
    return -1;
}`,
      cpp: `int swimInWater(vector<vector<int>>& grid) {
    int n = grid.size();
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    pq.push({grid[0][0], 0, 0});
    vector<vector<bool>> visited(n, vector<bool>(n, false));
    visited[0][0] = true;
    vector<pair<int,int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!pq.empty()) {
        auto [t, r, c] = pq.top(); pq.pop();
        if (r == n - 1 && c == n - 1) return t;
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc]) {
                visited[nr][nc] = true;
                pq.push({max(t, grid[nr][nc]), nr, nc});
            }
        }
    }
    return -1;
}`,
    },
  },
  {
    id: "alien-dictionary",
    title: "Alien Dictionary",
    difficulty: "Hard",
    category: "Graphs",
    solutions: {
      javascript: `function alienOrder(words) {
  const graph = new Map();
  for (let w of words) for (let c of w) if (!graph.has(c)) graph.set(c, new Set());
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        graph.get(w1[j]).add(w2[j]);
        break;
      }
    }
  }
  const visit = {}, res = [];
  function dfs(c) {
    if (c in visit) return visit[c];
    visit[c] = true;
    for (let nei of graph.get(c)) if (dfs(nei)) return true;
    visit[c] = false;
    res.push(c);
    return false;
  }
  for (let c of graph.keys()) if (dfs(c)) return "";
  return res.reverse().join("");
}`,
      python: `def alienOrder(words):
    graph = {c: set() for w in words for c in w}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        if len(w1) > len(w2) and w1.startswith(w2):
            return ""
        for j in range(min(len(w1), len(w2))):
            if w1[j] != w2[j]:
                graph[w1[j]].add(w2[j])
                break
    visit, res = {}, []
    def dfs(c):
        if c in visit:
            return visit[c]
        visit[c] = True
        for nei in graph[c]:
            if dfs(nei):
                return True
        visit[c] = False
        res.append(c)
        return False
    for c in graph:
        if dfs(c):
            return ""
    return "".join(res[::-1])`,
      java: `public String alienOrder(String[] words) {
    Map<Character, Set<Character>> graph = new HashMap<>();
    for (String w : words) for (char c : w.toCharArray()) graph.putIfAbsent(c, new HashSet<>());
    for (int i = 0; i < words.length - 1; i++) {
        String w1 = words[i], w2 = words[i + 1];
        if (w1.length() > w2.length() && w1.startsWith(w2)) return "";
        for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
            if (w1.charAt(j) != w2.charAt(j)) {
                graph.get(w1.charAt(j)).add(w2.charAt(j));
                break;
            }
        }
    }
    Map<Character, Integer> visit = new HashMap<>();
    StringBuilder res = new StringBuilder();
    for (char c : graph.keySet()) {
        if (dfs(c, graph, visit, res)) return "";
    }
    return res.reverse().toString();
}
boolean dfs(char c, Map<Character, Set<Character>> graph, Map<Character, Integer> visit, StringBuilder res) {
    if (visit.containsKey(c)) return visit.get(c) == 1;
    visit.put(c, 1);
    for (char nei : graph.get(c)) {
        if (dfs(nei, graph, visit, res)) return true;
    }
    visit.put(c, 2);
    res.append(c);
    return false;
}`,
      cpp: `string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> graph;
    for (auto& w : words) for (char c : w) graph[c];
    for (int i = 0; i < words.size() - 1; i++) {
        string w1 = words[i], w2 = words[i + 1];
        if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) return "";
        for (int j = 0; j < min(w1.size(), w2.size()); j++) {
            if (w1[j] != w2[j]) {
                graph[w1[j]].insert(w2[j]);
                break;
            }
        }
    }
    unordered_map<char, int> visit;
    string res;
    function<bool(char)> dfs = [&](char c) {
        if (visit.count(c)) return visit[c] == 1;
        visit[c] = 1;
        for (char nei : graph[c]) if (dfs(nei)) return true;
        visit[c] = 2;
        res += c;
        return false;
    };
    for (auto& [c, _] : graph) if (dfs(c)) return "";
    reverse(res.begin(), res.end());
    return res;
}`,
    },
  },
  {
    id: "min-cost-connect-points",
    title: "Min Cost to Connect All Points",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function minCostConnectPoints(points) {
  const n = points.length;
  const visited = new Set([0]);
  const heap = [];
  for (let i = 1; i < n; i++) {
    const dist = Math.abs(points[0][0] - points[i][0]) + Math.abs(points[0][1] - points[i][1]);
    heap.push([dist, i]);
  }
  heap.sort((a, b) => a[0] - b[0]);
  let cost = 0;
  while (visited.size < n) {
    heap.sort((a, b) => a[0] - b[0]);
    const [d, i] = heap.shift();
    if (visited.has(i)) continue;
    visited.add(i);
    cost += d;
    for (let j = 0; j < n; j++) {
      if (!visited.has(j)) {
        const dist = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
        heap.push([dist, j]);
      }
    }
  }
  return cost;
}`,
      python: `def minCostConnectPoints(points):
    import heapq
    n = len(points)
    visited = {0}
    heap = []
    for i in range(1, n):
        dist = abs(points[0][0] - points[i][0]) + abs(points[0][1] - points[i][1])
        heapq.heappush(heap, (dist, i))
    cost = 0
    while len(visited) < n:
        d, i = heapq.heappop(heap)
        if i in visited: continue
        visited.add(i)
        cost += d
        for j in range(n):
            if j not in visited:
                dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
                heapq.heappush(heap, (dist, j))
    return cost`,
      java: `public int minCostConnectPoints(int[][] points) {
    int n = points.length;
    boolean[] visited = new boolean[n];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, 0});
    int cost = 0, count = 0;
    while (count < n) {
        int[] curr = pq.poll();
        int d = curr[0], i = curr[1];
        if (visited[i]) continue;
        visited[i] = true;
        cost += d;
        count++;
        for (int j = 0; j < n; j++) {
            if (!visited[j]) {
                int dist = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
                pq.offer(new int[]{dist, j});
            }
        }
    }
    return cost;
}`,
      cpp: `int minCostConnectPoints(vector<vector<int>>& points) {
    int n = points.size();
    vector<bool> visited(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
    int cost = 0, count = 0;
    while (count < n) {
        auto [d, i] = pq.top(); pq.pop();
        if (visited[i]) continue;
        visited[i] = true;
        cost += d;
        count++;
        for (int j = 0; j < n; j++) {
            if (!visited[j]) {
                int dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);
                pq.push({dist, j});
            }
        }
    }
    return cost;
}`,
    },
  },
  {
    id: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function networkDelayTime(times, n, k) {
  const graph = new Map();
  for (let [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push([v, w]);
  }
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap = [[0, k]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [d, u] = heap.shift();
    if (d > dist[u]) continue;
    for (let [v, w] of graph.get(u) || []) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        heap.push([dist[v], v]);
      }
    }
  }
  const res = Math.max(...dist.slice(1));
  return res === Infinity ? -1 : res;
}`,
      python: `def networkDelayTime(times, n, k):
    import heapq
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))
    dist = {i: float('inf') for i in range(1, n + 1)}
    dist[k] = 0
    heap = [(0, k)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    res = max(dist.values())
    return res if res != float('inf') else -1`,
      java: `public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> graph = new HashMap<>();
    for (int[] t : times) {
        graph.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
    }
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, k});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;
        for (int[] edge : graph.getOrDefault(u, new ArrayList<>())) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    int res = 0;
    for (int i = 1; i <= n; i++) res = Math.max(res, dist[i]);
    return res == Integer.MAX_VALUE ? -1 : res;
}`,
      cpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int,int>>> graph(n + 1);
    for (auto& t : times) graph[t[0]].push_back({t[1], t[2]});
    vector<int> dist(n + 1, INT_MAX);
    dist[k] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, k});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    int res = *max_element(dist.begin() + 1, dist.end());
    return res == INT_MAX ? -1 : res;
}`,
    },
  },
  {
    id: "cheapest-flights-k-stops",
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    category: "Graphs",
    solutions: {
      javascript: `function findCheapestPrice(n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  for (let i = 0; i <= k; i++) {
    const temp = [...prices];
    for (let [u, v, w] of flights) {
      if (prices[u] !== Infinity) {
        temp[v] = Math.min(temp[v], prices[u] + w);
      }
    }
    prices = temp;
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
}`,
      python: `def findCheapestPrice(n, flights, src, dst, k):
    prices = [float('inf')] * n
    prices[src] = 0
    for _ in range(k + 1):
        temp = prices[:]
        for u, v, w in flights:
            if prices[u] != float('inf'):
                temp[v] = min(temp[v], prices[u] + w)
        prices = temp
    return prices[dst] if prices[dst] != float('inf') else -1`,
      java: `public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] prices = new int[n];
    Arrays.fill(prices, Integer.MAX_VALUE);
    prices[src] = 0;
    for (int i = 0; i <= k; i++) {
        int[] temp = prices.clone();
        for (int[] f : flights) {
            if (prices[f[0]] != Integer.MAX_VALUE) {
                temp[f[1]] = Math.min(temp[f[1]], prices[f[0]] + f[2]);
            }
        }
        prices = temp;
    }
    return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
}`,
      cpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> prices(n, INT_MAX);
    prices[src] = 0;
    for (int i = 0; i <= k; i++) {
        vector<int> temp = prices;
        for (auto& f : flights) {
            if (prices[f[0]] != INT_MAX) {
                temp[f[1]] = min(temp[f[1]], prices[f[0]] + f[2]);
            }
        }
        prices = temp;
    }
    return prices[dst] == INT_MAX ? -1 : prices[dst];
}`,
    },
  },
  {
    id: "reconstruct-itinerary",
    title: "Reconstruct Itinerary",
    difficulty: "Hard",
    category: "Graphs",
    solutions: {
      javascript: `function findItinerary(tickets) {
  const graph = new Map();
  for (let [from, to] of tickets) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }
  for (let [, dests] of graph) dests.sort().reverse();
  const res = [];
  function dfs(airport) {
    while ((graph.get(airport) || []).length) {
      dfs(graph.get(airport).pop());
    }
    res.push(airport);
  }
  dfs("JFK");
  return res.reverse();
}`,
      python: `def findItinerary(tickets):
    from collections import defaultdict
    graph = defaultdict(list)
    for src, dst in sorted(tickets, reverse=True):
        graph[src].append(dst)
    res = []
    def dfs(airport):
        while graph[airport]:
            dfs(graph[airport].pop())
        res.append(airport)
    dfs("JFK")
    return res[::-1]`,
      java: `public List<String> findItinerary(List<List<String>> tickets) {
    Map<String, PriorityQueue<String>> graph = new HashMap<>();
    for (List<String> t : tickets) {
        graph.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).offer(t.get(1));
    }
    LinkedList<String> res = new LinkedList<>();
    dfs("JFK", graph, res);
    return res;
}
void dfs(String airport, Map<String, PriorityQueue<String>> graph, LinkedList<String> res) {
    PriorityQueue<String> dests = graph.get(airport);
    while (dests != null && !dests.isEmpty()) {
        dfs(dests.poll(), graph, res);
    }
    res.addFirst(airport);
}`,
      cpp: `vector<string> findItinerary(vector<vector<string>>& tickets) {
    unordered_map<string, priority_queue<string, vector<string>, greater<>>> graph;
    for (auto& t : tickets) graph[t[0]].push(t[1]);
    vector<string> res;
    function<void(string)> dfs = [&](string airport) {
        while (!graph[airport].empty()) {
            string next = graph[airport].top();
            graph[airport].pop();
            dfs(next);
        }
        res.push_back(airport);
    };
    dfs("JFK");
    reverse(res.begin(), res.end());
    return res;
}`,
    },
  },
  {
    id: "burst-balloons",
    title: "Burst Balloons",
    difficulty: "Hard",
    category: "2-D DP",
    solutions: {
      javascript: `function maxCoins(nums) {
  nums = [1, ...nums, 1];
  const n = nums.length;
  const dp = Array.from({length: n}, () => Array(n).fill(0));
  for (let len = 2; len < n; len++) {
    for (let left = 0; left < n - len; left++) {
      const right = left + len;
      for (let i = left + 1; i < right; i++) {
        dp[left][right] = Math.max(dp[left][right],
          nums[left] * nums[i] * nums[right] + dp[left][i] + dp[i][right]);
      }
    }
  }
  return dp[0][n - 1];
}`,
      python: `def maxCoins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            for i in range(left + 1, right):
                dp[left][right] = max(dp[left][right],
                    nums[left] * nums[i] * nums[right] + dp[left][i] + dp[i][right])
    return dp[0][n - 1]`,
      java: `public int maxCoins(int[] nums) {
    int n = nums.length + 2;
    int[] arr = new int[n];
    arr[0] = arr[n - 1] = 1;
    for (int i = 1; i < n - 1; i++) arr[i] = nums[i - 1];
    int[][] dp = new int[n][n];
    for (int len = 2; len < n; len++) {
        for (int left = 0; left < n - len; left++) {
            int right = left + len;
            for (int i = left + 1; i < right; i++) {
                dp[left][right] = Math.max(dp[left][right],
                    arr[left] * arr[i] * arr[right] + dp[left][i] + dp[i][right]);
            }
        }
    }
    return dp[0][n - 1];
}`,
      cpp: `int maxCoins(vector<int>& nums) {
    int n = nums.size() + 2;
    vector<int> arr(n);
    arr[0] = arr[n - 1] = 1;
    for (int i = 1; i < n - 1; i++) arr[i] = nums[i - 1];
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len < n; len++) {
        for (int left = 0; left < n - len; left++) {
            int right = left + len;
            for (int i = left + 1; i < right; i++) {
                dp[left][right] = max(dp[left][right],
                    arr[left] * arr[i] * arr[right] + dp[left][i] + dp[i][right]);
            }
        }
    }
    return dp[0][n - 1];
}`,
    },
  },
  {
    id: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "2-D DP",
    solutions: {
      javascript: `function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2] || ((s[i - 1] === p[j - 2] || p[j - 2] === '.') && dp[i - 1][j]);
      } else {
        dp[i][j] = (s[i - 1] === p[j - 1] || p[j - 1] === '.') && dp[i - 1][j - 1];
      }
    }
  }
  return dp[m][n];
}`,
      python: `def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2] or ((s[i - 1] == p[j - 2] or p[j - 2] == '.') and dp[i - 1][j])
            else:
                dp[i][j] = (s[i - 1] == p[j - 1] or p[j - 1] == '.') and dp[i - 1][j - 1]
    return dp[m][n]`,
      java: `public boolean isMatch(String s, String p) {
    int m = s.length(), n = p.length();
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;
    for (int j = 1; j <= n; j++) {
        if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[i][j] = dp[i][j - 2] || ((s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.') && dp[i - 1][j]);
            } else {
                dp[i][j] = (s.charAt(i - 1) == p.charAt(j - 1) || p.charAt(j - 1) == '.') && dp[i - 1][j - 1];
            }
        }
    }
    return dp[m][n];
}`,
      cpp: `bool isMatch(string s, string p) {
    int m = s.size(), n = p.size();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;
    for (int j = 1; j <= n; j++) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2] || ((s[i - 1] == p[j - 2] || p[j - 2] == '.') && dp[i - 1][j]);
            } else {
                dp[i][j] = (s[i - 1] == p[j - 1] || p[j - 1] == '.') && dp[i - 1][j - 1];
            }
        }
    }
    return dp[m][n];
}`,
    },
  },
  {
    id: "distinct-subsequences",
    title: "Distinct Subsequences",
    difficulty: "Hard",
    category: "2-D DP",
    solutions: {
      javascript: `function numDistinct(s, t) {
  const m = s.length, n = t.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (s[i - 1] === t[j - 1]) dp[j] += dp[j - 1];
    }
  }
  return dp[n];
}`,
      python: `def numDistinct(s, t):
    m, n = len(s), len(t)
    dp = [0] * (n + 1)
    dp[0] = 1
    for i in range(1, m + 1):
        for j in range(n, 0, -1):
            if s[i - 1] == t[j - 1]:
                dp[j] += dp[j - 1]
    return dp[n]`,
      java: `public int numDistinct(String s, String t) {
    int m = s.length(), n = t.length();
    long[] dp = new long[n + 1];
    dp[0] = 1;
    for (int i = 1; i <= m; i++) {
        for (int j = n; j >= 1; j--) {
            if (s.charAt(i - 1) == t.charAt(j - 1)) dp[j] += dp[j - 1];
        }
    }
    return (int) dp[n];
}`,
      cpp: `int numDistinct(string s, string t) {
    int m = s.size(), n = t.size();
    vector<unsigned long long> dp(n + 1, 0);
    dp[0] = 1;
    for (int i = 1; i <= m; i++) {
        for (int j = n; j >= 1; j--) {
            if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];
        }
    }
    return dp[n];
}`,
    },
  },
  {
    id: "valid-parenthesis-string",
    title: "Valid Parenthesis String",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function checkValidString(s) {
  let lo = 0, hi = 0;
  for (let c of s) {
    if (c === '(') { lo++; hi++; }
    else if (c === ')') { lo--; hi--; }
    else { lo--; hi++; }
    if (hi < 0) return false;
    lo = Math.max(lo, 0);
  }
  return lo === 0;
}`,
      python: `def checkValidString(s):
    lo = hi = 0
    for c in s:
        if c == '(':
            lo += 1
            hi += 1
        elif c == ')':
            lo -= 1
            hi -= 1
        else:
            lo -= 1
            hi += 1
        if hi < 0: return False
        lo = max(lo, 0)
    return lo == 0`,
      java: `public boolean checkValidString(String s) {
    int lo = 0, hi = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') { lo++; hi++; }
        else if (c == ')') { lo--; hi--; }
        else { lo--; hi++; }
        if (hi < 0) return false;
        lo = Math.max(lo, 0);
    }
    return lo == 0;
}`,
      cpp: `bool checkValidString(string s) {
    int lo = 0, hi = 0;
    for (char c : s) {
        if (c == '(') { lo++; hi++; }
        else if (c == ')') { lo--; hi--; }
        else { lo--; hi++; }
        if (hi < 0) return false;
        lo = max(lo, 0);
    }
    return lo == 0;
}`,
    },
  },
  {
    id: "partition-labels",
    title: "Partition Labels",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const res = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(end - start + 1);
      start = end + 1;
    }
  }
  return res;
}`,
      python: `def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}
    res = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end - start + 1)
            start = end + 1
    return res`,
      java: `public List<Integer> partitionLabels(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
    List<Integer> res = new ArrayList<>();
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        end = Math.max(end, last[s.charAt(i) - 'a']);
        if (i == end) {
            res.add(end - start + 1);
            start = end + 1;
        }
    }
    return res;
}`,
      cpp: `vector<int> partitionLabels(string s) {
    vector<int> last(26, 0);
    for (int i = 0; i < s.size(); i++) last[s[i] - 'a'] = i;
    vector<int> res;
    int start = 0, end = 0;
    for (int i = 0; i < s.size(); i++) {
        end = max(end, last[s[i] - 'a']);
        if (i == end) {
            res.push_back(end - start + 1);
            start = end + 1;
        }
    }
    return res;
}`,
    },
  },
  {
    id: "median-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    solutions: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;
    const left1 = i === 0 ? -Infinity : nums1[i - 1];
    const right1 = i === m ? Infinity : nums1[i];
    const left2 = j === 0 ? -Infinity : nums2[j - 1];
    const right2 = j === n ? Infinity : nums2[j];
    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    } else if (left1 > right2) hi = i - 1;
    else lo = i + 1;
  }
}`,
      python: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        left1 = float('-inf') if i == 0 else nums1[i - 1]
        right1 = float('inf') if i == m else nums1[i]
        left2 = float('-inf') if j == 0 else nums2[j - 1]
        right2 = float('inf') if j == n else nums2[j]
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 1:
                return max(left1, left2)
            return (max(left1, left2) + min(right1, right2)) / 2
        elif left1 > right2:
            hi = i - 1
        else:
            lo = i + 1`,
      java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    int m = nums1.length, n = nums2.length;
    int lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = (m + n + 1) / 2 - i;
        int left1 = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
        int right1 = i == m ? Integer.MAX_VALUE : nums1[i];
        int left2 = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
        int right2 = j == n ? Integer.MAX_VALUE : nums2[j];
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 == 1) return Math.max(left1, left2);
            return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
        } else if (left1 > right2) hi = i - 1;
        else lo = i + 1;
    }
    return 0;
}`,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) swap(nums1, nums2);
    int m = nums1.size(), n = nums2.size();
    int lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = (m + n + 1) / 2 - i;
        int left1 = i == 0 ? INT_MIN : nums1[i - 1];
        int right1 = i == m ? INT_MAX : nums1[i];
        int left2 = j == 0 ? INT_MIN : nums2[j - 1];
        int right2 = j == n ? INT_MAX : nums2[j];
        if (left1 <= right2 && left2 <= right1) {
            if ((m + n) % 2 == 1) return max(left1, left2);
            return (max(left1, left2) + min(right1, right2)) / 2.0;
        } else if (left1 > right2) hi = i - 1;
        else lo = i + 1;
    }
    return 0;
}`,
    },
  },
  {
    id: "minimum-interval",
    title: "Minimum Interval to Include Each Query",
    difficulty: "Hard",
    category: "Intervals",
    solutions: {
      javascript: `function minInterval(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  const sortedQ = [...queries].map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
  const res = new Array(queries.length).fill(-1);
  const heap = [];
  let i = 0;
  for (let [q, idx] of sortedQ) {
    while (i < intervals.length && intervals[i][0] <= q) {
      heap.push([intervals[i][1] - intervals[i][0] + 1, intervals[i][1]]);
      heap.sort((a, b) => a[0] - b[0]);
      i++;
    }
    while (heap.length && heap[0][1] < q) heap.shift();
    if (heap.length) res[idx] = heap[0][0];
  }
  return res;
}`,
      python: `def minInterval(intervals, queries):
    import heapq
    intervals.sort()
    sortedQ = sorted([(q, i) for i, q in enumerate(queries)])
    res = [-1] * len(queries)
    heap = []
    i = 0
    for q, idx in sortedQ:
        while i < len(intervals) and intervals[i][0] <= q:
            l, r = intervals[i]
            heapq.heappush(heap, (r - l + 1, r))
            i += 1
        while heap and heap[0][1] < q:
            heapq.heappop(heap)
        if heap:
            res[idx] = heap[0][0]
    return res`,
      java: `public int[] minInterval(int[][] intervals, int[] queries) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    int[][] sortedQ = new int[queries.length][2];
    for (int i = 0; i < queries.length; i++) sortedQ[i] = new int[]{queries[i], i};
    Arrays.sort(sortedQ, (a, b) -> a[0] - b[0]);
    int[] res = new int[queries.length];
    Arrays.fill(res, -1);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    int i = 0;
    for (int[] q : sortedQ) {
        while (i < intervals.length && intervals[i][0] <= q[0]) {
            pq.offer(new int[]{intervals[i][1] - intervals[i][0] + 1, intervals[i][1]});
            i++;
        }
        while (!pq.isEmpty() && pq.peek()[1] < q[0]) pq.poll();
        if (!pq.isEmpty()) res[q[1]] = pq.peek()[0];
    }
    return res;
}`,
      cpp: `vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
    sort(intervals.begin(), intervals.end());
    vector<pair<int, int>> sortedQ;
    for (int i = 0; i < queries.size(); i++) sortedQ.push_back({queries[i], i});
    sort(sortedQ.begin(), sortedQ.end());
    vector<int> res(queries.size(), -1);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    int i = 0;
    for (auto [q, idx] : sortedQ) {
        while (i < intervals.size() && intervals[i][0] <= q) {
            pq.push({intervals[i][1] - intervals[i][0] + 1, intervals[i][1]});
            i++;
        }
        while (!pq.empty() && pq.top().second < q) pq.pop();
        if (!pq.empty()) res[idx] = pq.top().first;
    }
    return res;
}`,
    },
  },
  {
    id: "merge-triplets",
    title: "Merge Triplets to Form Target Triplet",
    difficulty: "Medium",
    category: "Greedy",
    solutions: {
      javascript: `function mergeTriplets(triplets, target) {
  const good = new Set();
  for (let t of triplets) {
    if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
    for (let i = 0; i < 3; i++) {
      if (t[i] === target[i]) good.add(i);
    }
  }
  return good.size === 3;
}`,
      python: `def mergeTriplets(triplets, target):
    good = set()
    for t in triplets:
        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:
            continue
        for i in range(3):
            if t[i] == target[i]:
                good.add(i)
    return len(good) == 3`,
      java: `public boolean mergeTriplets(int[][] triplets, int[] target) {
    Set<Integer> good = new HashSet<>();
    for (int[] t : triplets) {
        if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
        for (int i = 0; i < 3; i++) {
            if (t[i] == target[i]) good.add(i);
        }
    }
    return good.size() == 3;
}`,
      cpp: `bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
    set<int> good;
    for (auto& t : triplets) {
        if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
        for (int i = 0; i < 3; i++) {
            if (t[i] == target[i]) good.insert(i);
        }
    }
    return good.size() == 3;
}`,
    },
  },
  {
    id: "detect-squares",
    title: "Detect Squares",
    difficulty: "Medium",
    category: "Math & Geometry",
    solutions: {
      javascript: `class DetectSquares {
  constructor() {
    this.ptsCount = new Map();
    this.pts = [];
  }
  add(point) {
    const key = point[0] + ',' + point[1];
    this.ptsCount.set(key, (this.ptsCount.get(key) || 0) + 1);
    this.pts.push(point);
  }
  count(point) {
    let res = 0;
    const [px, py] = point;
    for (let [x, y] of this.pts) {
      if (Math.abs(px - x) !== Math.abs(py - y) || x === px || y === py) continue;
      res += (this.ptsCount.get(x + ',' + py) || 0) * (this.ptsCount.get(px + ',' + y) || 0);
    }
    return res;
  }
}`,
      python: `class DetectSquares:
    def __init__(self):
        self.ptsCount = {}
        self.pts = []
    def add(self, point):
        key = tuple(point)
        self.ptsCount[key] = self.ptsCount.get(key, 0) + 1
        self.pts.append(point)
    def count(self, point):
        res = 0
        px, py = point
        for x, y in self.pts:
            if abs(px - x) != abs(py - y) or x == px or y == py:
                continue
            res += self.ptsCount.get((x, py), 0) * self.ptsCount.get((px, y), 0)
        return res`,
      java: `class DetectSquares {
    Map<String, Integer> ptsCount = new HashMap<>();
    List<int[]> pts = new ArrayList<>();
    public void add(int[] point) {
        String key = point[0] + "," + point[1];
        ptsCount.put(key, ptsCount.getOrDefault(key, 0) + 1);
        pts.add(point);
    }
    public int count(int[] point) {
        int res = 0, px = point[0], py = point[1];
        for (int[] p : pts) {
            int x = p[0], y = p[1];
            if (Math.abs(px - x) != Math.abs(py - y) || x == px || y == py) continue;
            res += ptsCount.getOrDefault(x + "," + py, 0) * ptsCount.getOrDefault(px + "," + y, 0);
        }
        return res;
    }
}`,
      cpp: `class DetectSquares {
    map<pair<int,int>, int> ptsCount;
    vector<pair<int,int>> pts;
public:
    void add(vector<int> point) {
        ptsCount[{point[0], point[1]}]++;
        pts.push_back({point[0], point[1]});
    }
    int count(vector<int> point) {
        int res = 0, px = point[0], py = point[1];
        for (auto [x, y] : pts) {
            if (abs(px - x) != abs(py - y) || x == px || y == py) continue;
            res += ptsCount[{x, py}] * ptsCount[{px, y}];
        }
        return res;
    }
};`,
    },
  },
  {
    id: "multiply-strings",
    title: "Multiply Strings",
    difficulty: "Medium",
    category: "Math & Geometry",
    solutions: {
      javascript: `function multiply(num1, num2) {
  const m = num1.length, n = num2.length;
  const pos = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + pos[p2];
      pos[p2] = sum % 10;
      pos[p1] += Math.floor(sum / 10);
    }
  }
  let res = pos.join('').replace(/^0+/, '');
  return res || '0';
}`,
      python: `def multiply(num1, num2):
    m, n = len(num1), len(num2)
    pos = [0] * (m + n)
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            mul = int(num1[i]) * int(num2[j])
            p1, p2 = i + j, i + j + 1
            total = mul + pos[p2]
            pos[p2] = total % 10
            pos[p1] += total // 10
    res = ''.join(map(str, pos)).lstrip('0')
    return res or '0'`,
      java: `public String multiply(String num1, String num2) {
    int m = num1.length(), n = num2.length();
    int[] pos = new int[m + n];
    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            int p1 = i + j, p2 = i + j + 1;
            int sum = mul + pos[p2];
            pos[p2] = sum % 10;
            pos[p1] += sum / 10;
        }
    }
    StringBuilder sb = new StringBuilder();
    for (int p : pos) if (!(sb.length() == 0 && p == 0)) sb.append(p);
    return sb.length() == 0 ? "0" : sb.toString();
}`,
      cpp: `string multiply(string num1, string num2) {
    int m = num1.size(), n = num2.size();
    vector<int> pos(m + n, 0);
    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int mul = (num1[i] - '0') * (num2[j] - '0');
            int p1 = i + j, p2 = i + j + 1;
            int sum = mul + pos[p2];
            pos[p2] = sum % 10;
            pos[p1] += sum / 10;
        }
    }
    string res;
    for (int p : pos) if (!(res.empty() && p == 0)) res += to_string(p);
    return res.empty() ? "0" : res;
}`,
    },
  },
  {
    id: "design-twitter",
    title: "Design Twitter",
    difficulty: "Medium",
    category: "Heap",
    solutions: {
      javascript: `class Twitter {
  constructor() {
    this.time = 0;
    this.tweets = new Map();
    this.follows = new Map();
  }
  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push([this.time++, tweetId]);
  }
  getNewsFeed(userId) {
    const feed = [];
    const users = [userId, ...(this.follows.get(userId) || [])];
    for (let u of users) {
      feed.push(...(this.tweets.get(u) || []));
    }
    feed.sort((a, b) => b[0] - a[0]);
    return feed.slice(0, 10).map(t => t[1]);
  }
  follow(followerId, followeeId) {
    if (!this.follows.has(followerId)) this.follows.set(followerId, new Set());
    this.follows.get(followerId).add(followeeId);
  }
  unfollow(followerId, followeeId) {
    if (this.follows.has(followerId)) this.follows.get(followerId).delete(followeeId);
  }
}`,
      python: `class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = {}
        self.follows = {}
    def postTweet(self, userId, tweetId):
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1
    def getNewsFeed(self, userId):
        feed = []
        users = [userId] + list(self.follows.get(userId, set()))
        for u in users:
            feed.extend(self.tweets.get(u, []))
        feed.sort(key=lambda x: -x[0])
        return [t[1] for t in feed[:10]]
    def follow(self, followerId, followeeId):
        if followerId not in self.follows:
            self.follows[followerId] = set()
        self.follows[followerId].add(followeeId)
    def unfollow(self, followerId, followeeId):
        if followerId in self.follows:
            self.follows[followerId].discard(followeeId)`,
      java: `class Twitter {
    int time = 0;
    Map<Integer, List<int[]>> tweets = new HashMap<>();
    Map<Integer, Set<Integer>> follows = new HashMap<>();
    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{time++, tweetId});
    }
    public List<Integer> getNewsFeed(int userId) {
        List<int[]> feed = new ArrayList<>();
        Set<Integer> users = follows.getOrDefault(userId, new HashSet<>());
        users.add(userId);
        for (int u : users) feed.addAll(tweets.getOrDefault(u, new ArrayList<>()));
        feed.sort((a, b) -> b[0] - a[0]);
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < Math.min(10, feed.size()); i++) res.add(feed.get(i)[1]);
        users.remove(userId);
        return res;
    }
    public void follow(int followerId, int followeeId) {
        follows.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }
    public void unfollow(int followerId, int followeeId) {
        if (follows.containsKey(followerId)) follows.get(followerId).remove(followeeId);
    }
}`,
      cpp: `class Twitter {
    int time = 0;
    unordered_map<int, vector<pair<int,int>>> tweets;
    unordered_map<int, set<int>> follows;
public:
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }
    vector<int> getNewsFeed(int userId) {
        vector<pair<int,int>> feed;
        set<int> users = follows[userId];
        users.insert(userId);
        for (int u : users) {
            for (auto& t : tweets[u]) feed.push_back(t);
        }
        sort(feed.begin(), feed.end(), [](auto& a, auto& b) { return a.first > b.first; });
        vector<int> res;
        for (int i = 0; i < min(10, (int)feed.size()); i++) res.push_back(feed[i].second);
        return res;
    }
    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId);
    }
    void unfollow(int followerId, int followeeId) {
        follows[followerId].erase(followeeId);
    }
};`,
    },
  },
  {
    id: "coin-change-ii",
    title: "Coin Change II",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  return dp[amount];
}`,
      python: `def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    return dp[amount]`,
      java: `public int change(int amount, int[] coins) {
    int[] dp = new int[amount + 1];
    dp[0] = 1;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}`,
      cpp: `int change(int amount, vector<int>& coins) {
    vector<int> dp(amount + 1, 0);
    dp[0] = 1;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}`,
    },
  },
  {
    id: "best-time-to-buy-sell-cooldown",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    category: "2-D DP",
    solutions: {
      javascript: `function maxProfit(prices) {
  let sold = 0, hold = -Infinity, rest = 0;
  for (let price of prices) {
    const prevSold = sold;
    sold = hold + price;
    hold = Math.max(hold, rest - price);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}`,
      python: `def maxProfit(prices):
    sold, hold, rest = 0, float('-inf'), 0
    for price in prices:
        prev_sold = sold
        sold = hold + price
        hold = max(hold, rest - price)
        rest = max(rest, prev_sold)
    return max(sold, rest)`,
      java: `public int maxProfit(int[] prices) {
    int sold = 0, hold = Integer.MIN_VALUE, rest = 0;
    for (int price : prices) {
        int prevSold = sold;
        sold = hold + price;
        hold = Math.max(hold, rest - price);
        rest = Math.max(rest, prevSold);
    }
    return Math.max(sold, rest);
}`,
      cpp: `int maxProfit(vector<int>& prices) {
    int sold = 0, hold = INT_MIN, rest = 0;
    for (int price : prices) {
        int prevSold = sold;
        sold = hold + price;
        hold = max(hold, rest - price);
        rest = max(rest, prevSold);
    }
    return max(sold, rest);
}`,
    },
  },
  {
    id: "longest-increasing-path",
    title: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    category: "2-D DP",
    solutions: {
      javascript: `function longestIncreasingPath(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const memo = Array.from({length: m}, () => Array(n).fill(0));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  function dfs(r, c) {
    if (memo[r][c]) return memo[r][c];
    memo[r][c] = 1;
    for (let [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < m && nc < n && matrix[nr][nc] > matrix[r][c]) {
        memo[r][c] = Math.max(memo[r][c], 1 + dfs(nr, nc));
      }
    }
    return memo[r][c];
  }
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res = Math.max(res, dfs(i, j));
    }
  }
  return res;
}`,
      python: `def longestIncreasingPath(matrix):
    m, n = len(matrix), len(matrix[0])
    memo = {}
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    def dfs(r, c):
        if (r, c) in memo: return memo[(r, c)]
        memo[(r, c)] = 1
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                memo[(r, c)] = max(memo[(r, c)], 1 + dfs(nr, nc))
        return memo[(r, c)]
    return max(dfs(i, j) for i in range(m) for j in range(n))`,
      java: `int[][] memo;
int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
public int longestIncreasingPath(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    memo = new int[m][n];
    int res = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            res = Math.max(res, dfs(matrix, i, j));
        }
    }
    return res;
}
int dfs(int[][] matrix, int r, int c) {
    if (memo[r][c] != 0) return memo[r][c];
    memo[r][c] = 1;
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nc >= 0 && nr < matrix.length && nc < matrix[0].length && matrix[nr][nc] > matrix[r][c]) {
            memo[r][c] = Math.max(memo[r][c], 1 + dfs(matrix, nr, nc));
        }
    }
    return memo[r][c];
}`,
      cpp: `int longestIncreasingPath(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> memo(m, vector<int>(n, 0));
    vector<pair<int,int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    function<int(int, int)> dfs = [&](int r, int c) {
        if (memo[r][c]) return memo[r][c];
        memo[r][c] = 1;
        for (auto [dr, dc] : dirs) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && matrix[nr][nc] > matrix[r][c]) {
                memo[r][c] = max(memo[r][c], 1 + dfs(nr, nc));
            }
        }
        return memo[r][c];
    };
    int res = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            res = max(res, dfs(i, j));
        }
    }
    return res;
}`,
    },
  },
  {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "1-D DP",
    solutions: {
      javascript: `function maxProduct(nums) {
  let res = nums[0], curMax = 1, curMin = 1;
  for (let n of nums) {
    const vals = [n, n * curMax, n * curMin];
    curMax = Math.max(...vals);
    curMin = Math.min(...vals);
    res = Math.max(res, curMax);
  }
  return res;
}`,
      python: `def maxProduct(nums):
    res = nums[0]
    curMax = curMin = 1
    for n in nums:
        vals = (n, n * curMax, n * curMin)
        curMax, curMin = max(vals), min(vals)
        res = max(res, curMax)
    return res`,
      java: `public int maxProduct(int[] nums) {
    int res = nums[0], curMax = 1, curMin = 1;
    for (int n : nums) {
        int temp = curMax;
        curMax = Math.max(n, Math.max(n * curMax, n * curMin));
        curMin = Math.min(n, Math.min(n * temp, n * curMin));
        res = Math.max(res, curMax);
    }
    return res;
}`,
      cpp: `int maxProduct(vector<int>& nums) {
    int res = nums[0], curMax = 1, curMin = 1;
    for (int n : nums) {
        int temp = curMax;
        curMax = max({n, n * curMax, n * curMin});
        curMin = min({n, n * temp, n * curMin});
        res = max(res, curMax);
    }
    return res;
}`,
    },
  },
  {
    id: "max-profit-job-schedule",
    title: "Maximum Profit in Job Scheduling",
    difficulty: "Hard",
    category: "1-D DP",
    solutions: {
      javascript: `function jobScheduling(startTime, endTime, profit) {
  const jobs = startTime.map((s, i) => [s, endTime[i], profit[i]]);
  jobs.sort((a, b) => a[1] - b[1]);
  const dp = [[0, 0]];
  for (let [s, e, p] of jobs) {
    let lo = 0, hi = dp.length - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (dp[mid][0] <= s) lo = mid;
      else hi = mid - 1;
    }
    const newProfit = dp[lo][1] + p;
    if (newProfit > dp[dp.length - 1][1]) {
      dp.push([e, newProfit]);
    }
  }
  return dp[dp.length - 1][1];
}`,
      python: `def jobScheduling(startTime, endTime, profit):
    import bisect
    jobs = sorted(zip(endTime, startTime, profit))
    dp = [(0, 0)]
    for e, s, p in jobs:
        i = bisect.bisect_right(dp, (s, float('inf'))) - 1
        new_profit = dp[i][1] + p
        if new_profit > dp[-1][1]:
            dp.append((e, new_profit))
    return dp[-1][1]`,
      java: `public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
    int n = startTime.length;
    int[][] jobs = new int[n][3];
    for (int i = 0; i < n; i++) jobs[i] = new int[]{endTime[i], startTime[i], profit[i]};
    Arrays.sort(jobs, (a, b) -> a[0] - b[0]);
    TreeMap<Integer, Integer> dp = new TreeMap<>();
    dp.put(0, 0);
    for (int[] job : jobs) {
        int cur = dp.floorEntry(job[1]).getValue() + job[2];
        if (cur > dp.lastEntry().getValue()) {
            dp.put(job[0], cur);
        }
    }
    return dp.lastEntry().getValue();
}`,
      cpp: `int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
    int n = startTime.size();
    vector<tuple<int,int,int>> jobs(n);
    for (int i = 0; i < n; i++) jobs[i] = {endTime[i], startTime[i], profit[i]};
    sort(jobs.begin(), jobs.end());
    map<int, int> dp;
    dp[0] = 0;
    for (auto& [e, s, p] : jobs) {
        int cur = prev(dp.upper_bound(s))->second + p;
        if (cur > dp.rbegin()->second) {
            dp[e] = cur;
        }
    }
    return dp.rbegin()->second;
}`,
    },
  },
];

export function getSolution(problem, language) {
  if (problem.solutions && problem.solutions[language]) {
    return problem.solutions[language];
  }
  if (problem.solutions && problem.solutions.javascript) {
    return problem.solutions.javascript;
  }
  return problem.solution || "";
}

export function getAvailableLanguages(problem) {
  if (problem.solutions) {
    return LANGUAGES.filter((lang) => problem.solutions[lang.id]);
  }
  return [LANGUAGES[0]];
}
