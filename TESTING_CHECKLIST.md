# 🧪 ADMIN PANEL - TESTING CHECKLIST

**Project:** Kedai Kopi Admin Panel  
**Test Date:** 2026-08-12  
**Tester:** _________________  
**Status:** LIVE DEMO

---

## 📋 PRE-TEST SETUP

- [ ] Live demo server running (port 8000)
- [ ] Browser opened to http://localhost:8000/admin.html
- [ ] Console (F12) open untuk monitor errors
- [ ] Network tab ready untuk check requests

---

## ✅ TEST 1: LOGIN SYSTEM

| Test Case | Steps | Expected Result | Pass |
|-----------|-------|-----------------|------|
| **Valid Login** | Enter admin/kedai2024 → Click Login | Dashboard loads | [ ] |
| **Invalid Username** | Enter wrong/kedai2024 | Error message | [ ] |
| **Invalid Password** | Enter admin/wrong123 | Error message | [ ] |
| **Empty Fields** | Leave fields blank → Login | Form validation error | [ ] |
| **Session Persist** | Login → Refresh page | Still logged in | [ ] |

---

## 📊 TEST 2: DASHBOARD

| Feature | Expected Result | Pass |
|---------|-----------------|------|
| Total Penjualan display | Rp 2.450.000 | [ ] |
| Total Transaksi count | 46 orders | [ ] |
| Total Reviews count | 28 reviews | [ ] |
| Total Menu Items | 21 items | [ ] |
| Top 5 Items list | Shows popular items | [ ] |
| Stats card styling | Proper color & spacing | [ ] |
| Mobile responsive | Stacked on mobile | [ ] |

---

## 🍰 TEST 3: MENU MANAGEMENT

### 3.1 - View All Items
- [ ] 21 menu items visible
- [ ] Columns: Name, Category, Price, Actions
- [ ] Table scrollable on mobile
- [ ] No console errors

### 3.2 - Category Filter
- [ ] "Espresso Based" → Shows ~6 items
- [ ] "Manual Brew" → Shows ~5 items  
- [ ] "Non-Coffee" → Shows ~5 items
- [ ] "Pastries" → Shows ~5 items
- [ ] "All Categories" → Shows all 21 items
- [ ] Filter buttons highlight current selection

### 3.3 - Add Menu Item
- [ ] Modal opens on "➕ Tambah Item"
- [ ] Form fields: Name, Category, Description, Price
- [ ] Required field validation works
- [ ] Submit creates new item in table
- [ ] New item persists after refresh

### 3.4 - Edit Menu Item  
- [ ] Edit modal opens with current data
- [ ] Data can be modified
- [ ] Submit updates table immediately
- [ ] Changes persist after refresh

### 3.5 - Delete Menu Item
- [ ] Delete button triggers confirmation
- [ ] Confirmation dialog appears
- [ ] Confirm removes item from table
- [ ] Canceling keeps item

---

## ⭐ TEST 4: REVIEW MANAGEMENT

- [ ] All 3 sample reviews visible
- [ ] Star ratings display correctly (1-5)
- [ ] Filter by "5-Star" works
- [ ] Filter by "4-Star" works
- [ ] Filter by "Flagged" works
- [ ] Approve button changes badge to green
- [ ] Reject button changes badge to red
- [ ] Delete button removes review
- [ ] Responsive on mobile

---

## 🎟️ TEST 5: PROMO CODE MANAGEMENT

### 5.1 - View Promos
- [ ] Existing 3 promos visible
- [ ] Columns: Code, Discount %, Max Use, Used, Status
- [ ] Table formatted correctly

### 5.2 - Create Promo
- [ ] Modal opens on "➕ Buat Promo"
- [ ] Form validates required fields
- [ ] New promo created successfully
- [ ] Shows in table with correct data
- [ ] Persists after refresh

### 5.3 - Delete Promo
- [ ] Delete triggers confirmation
- [ ] Confirm removes promo
- [ ] Canceling keeps promo

---

## ⚙️ TEST 6: SETTINGS PAGE

- [ ] All tabs accessible
- [ ] Store info fields editable
- [ ] Settings saved to localStorage
- [ ] Security section visible
- [ ] No sensitive data exposed

---

## 🚪 TEST 7: LOGOUT

- [ ] Logout button accessible
- [ ] Confirmation dialog appears
- [ ] Confirm redirects to login
- [ ] Session cleared after logout
- [ ] Cannot access dashboard without login

---

## 📱 TEST 8: RESPONSIVE DESIGN

| Device | Layout | Navigation | Pass |
|--------|--------|-----------|------|
| Desktop (1920x1080) | ✅ Full layout | Tabs visible | [ ] |
| Laptop (1366x768) | ✅ Full layout | Tabs visible | [ ] |
| Tablet (768x1024) | ✅ Responsive | Tabs adapt | [ ] |
| Mobile Portrait (375x667) | ✅ Stacked | Hamburger menu | [ ] |
| Mobile Landscape (667x375) | ✅ Horizontal | Scroll as needed | [ ] |

**Test Steps:**
1. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
2. Select different devices from dropdown
3. Verify layout adapts properly
4. Check all buttons remain clickable

---

## 🌙 TEST 9: DARK THEME

- [ ] Background color: Dark (#111827)
- [ ] Text color: Light/white
- [ ] Accent color: Amber (#d97706)
- [ ] Card color: Lighter dark (#1f2937)
- [ ] Good contrast for readability
- [ ] No eye strain
- [ ] Buttons visible and clickable

---

## 🐛 TEST 10: BROWSER CONSOLE

**Steps:**
1. Open F12 Developer Tools
2. Go to Console tab
3. Check for errors

| Type | Expected | Pass |
|------|----------|------|
| Red Errors | NONE | [ ] |
| Yellow Warnings | OK (minor) | [ ] |
| Blue Info | OK | [ ] |
| Network Requests | All 200 OK | [ ] |

---

## ⚡ TEST 11: PERFORMANCE

| Metric | Expected | Actual | Pass |
|--------|----------|--------|------|
| Page Load Time | < 2 sec | ____ | [ ] |
| Admin Panel Open | < 1 sec | ____ | [ ] |
| Modal Open | < 500ms | ____ | [ ] |
| Add Item | < 1 sec | ____ | [ ] |
| Delete Item | < 500ms | ____ | [ ] |
| Responsive Speed | Smooth | ____ | [ ] |

**Measure:** F12 → Network tab → Reload, check load time

---

## 💾 TEST 12: DATA PERSISTENCE

```
Test Case: localStorage Persistence

1. Login to admin
2. Add menu item: "Test Item" - 99999 Rp
3. Go to Reviews tab
4. Refresh page (F5)
5. Go back to Menu Management
6. Expected: "Test Item" still there
7. Close browser completely
8. Reopen → Login
9. Expected: "Test Item" still there
```

- [ ] Menu items persist after refresh
- [ ] Menu items persist after browser close
- [ ] Reviews persist after refresh
- [ ] Promo codes persist after refresh
- [ ] Login session persists until logout

---

## 🔐 TEST 13: SECURITY CHECKS

- [ ] Password field is masked (•••)
- [ ] Admin credentials not visible in HTML
- [ ] localStorage used for session (OK for MVP)
- [ ] No API keys exposed in frontend
- [ ] No sensitive data logged to console

---

## 📊 TEST 14: FUNCTIONAL WORKFLOWS

### Workflow 1: Add & Manage Item
```
[ ] Add "Summer Blend" coffee - 45000 Rp
[ ] Edit price to 48000 Rp
[ ] Verify change in table
[ ] Delete item
[ ] Confirm deletion
```

### Workflow 2: Approve Reviews
```
[ ] Filter flagged reviews
[ ] Approve a flagged review
[ ] Badge changes to green
[ ] Filter 5-star only
[ ] Delete a 5-star review
```

### Workflow 3: Create Promo Campaign
```
[ ] Create promo: "SUMMER30" - 30% off - 200 max
[ ] Create promo: "VIP50" - 50% off - 50 max
[ ] View both in table
[ ] Delete "SUMMER30"
[ ] "VIP50" remains
```

---

## 🎯 TEST 15: USER EXPERIENCE

| Aspect | Rating | Comment |
|--------|--------|---------|
| Ease of Navigation | ⭐⭐⭐⭐⭐ | ___________ |
| UI/UX Design | ⭐⭐⭐⭐⭐ | ___________ |
| Dark Theme | ⭐⭐⭐⭐⭐ | ___________ |
| Mobile Experience | ⭐⭐⭐⭐⭐ | ___________ |
| Performance | ⭐⭐⭐⭐⭐ | ___________ |
| Data Visibility | ⭐⭐⭐⭐⭐ | ___________ |

---

## 🐛 BUGS FOUND

Document any issues:

| # | Description | Severity | Status |
|---|-------------|----------|--------|
| 1 | | LOW/MED/HIGH | OPEN/CLOSED |
| 2 | | LOW/MED/HIGH | OPEN/CLOSED |
| 3 | | LOW/MED/HIGH | OPEN/CLOSED |

---

## 📝 NOTES & OBSERVATIONS

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## ✅ FINAL APPROVAL

| Aspect | Approved |
|--------|----------|
| Ready for Production | [ ] YES [ ] NO |
| Recommend Changes | _______________ |
| Timeline | _______________ |
| Tester Signature | _______________ |

---

**Testing Date:** ________________  
**Tester Name:** ________________  
**Overall Status:** ✅ PASS / ⚠️ NEEDS WORK / ❌ FAIL

---

**Thank you for testing! 🚀☕**
