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
];

// Helper to get solution for a specific language (with fallback to JavaScript)
export function getSolution(problem, language) {
  if (problem.solutions && problem.solutions[language]) {
    return problem.solutions[language];
  }
  // Fallback to JavaScript if language not available
  if (problem.solutions && problem.solutions.javascript) {
    return problem.solutions.javascript;
  }
  // Legacy support for old format
  return problem.solution || "";
}

// Get available languages for a problem
export function getAvailableLanguages(problem) {
  if (problem.solutions) {
    return LANGUAGES.filter((lang) => problem.solutions[lang.id]);
  }
  return [LANGUAGES[0]]; // JavaScript only for legacy
}
