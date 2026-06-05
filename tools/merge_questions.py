import json
import os
import csv

def is_mitre_or_tool_question(question_text):
    low_text = question_text.lower()
    # Check for T-codes (e.g. T1190, T1566)
    if any(t in low_text for t in ["t1190", "t1566", "t1040", "t1557", "t1204", "t1110.004", "t1078"]):
        return True
    # Check for specific tool names
    tool_keywords = [
        "nmap", "whois", "theharvester", "nessus", "burp suite", "nikto", 
        "owasp zap", "wifi-pumpkin", "airmon-ng", "airodump-ng", "aireplay-ng", 
        "aircrack-ng", "airdecap-ng", "airgraph-ng", "radius", "rfprotect", 
        "tkiptun-ng", "airbase-ng"
    ]
    if any(tk in low_text for tk in tool_keywords):
        return True
    # Check for generic "which tool" or "which command" with specific features
    if "which tool" in low_text or "which command" in low_text or "which wireless tool" in low_text:
        sub_keywords = [
            "vulnerability scanning", "e-mail address", "centralized authentication", 
            "automated scanning", "vulnerabilities", "denial-of-service", "fake wap", 
            "whois", "wireless headers", "web application testing", "decrypt"
        ]
        if any(sk in low_text for sk in sub_keywords):
            return True
    return False

def classify_question(q_id, question_text):
    try:
        q_id = int(q_id)
    except (ValueError, TypeError):
        # Heuristics fallback
        if is_mitre_or_tool_question(question_text):
            return "MITRE 與網頁安全攻擊", "常考 MITRE 技術與資安工具"
        low_text = question_text.lower()
        if "wireless" in low_text or "wifi" in low_text or "802.11" in low_text or "ap" in low_text:
            return "無線網路與藍牙安全", "Wi-Fi 安全與加密協定"
        elif "bluetooth" in low_text or "blue" in low_text:
            return "無線網路與藍牙安全", "藍牙安全性與漏洞"
        elif "sql" in low_text or "injection" in low_text or "web" in low_text or "owasp" in low_text:
            return "MITRE 與網頁安全攻擊", "OWASP 網頁弱點與防禦"
        elif "mitre" in low_text or "tactic" in low_text or "technique" in low_text:
            return "MITRE 與網頁安全攻擊", "MITRE ATT&CK 框架"
        else:
            return "道德駭客與偵查技術", "道德駭客基礎與法規"
    
    # Subject 1: Ethical Hacking & Reconnaissance (道德駭客與偵查技術)
    if q_id in [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 161, 162, 163]:
        return "道德駭客與偵查技術", "道德駭客基礎與法規"
    elif q_id in [19, 20, 21, 22, 23, 164, 165, 166]:
        return "道德駭客與偵查技術", "滲透測試方法論"
    elif q_id in [24, 25, 26, 27, 34, 167]:
        return "道德駭客與偵查技術", "資訊蒐集與 WHOIS"
    elif q_id in [28, 29, 30, 35, 36, 37, 168, 169, 170]:
        return "道德駭客與偵查技術", "漏洞掃描與評估"
    
    # Subject 2: MITRE ATT&CK & Web Attacks (MITRE 與網頁安全攻擊)
    elif q_id in [31, 32, 33, 38, 39, 45, 50, 52, 141, 150, 152, 157, 160]:
        return "MITRE 與網頁安全攻擊", "MITRE ATT&CK 框架"
    elif q_id in [40, 46, 47, 142, 156]:
        return "MITRE 與網頁安全攻擊", "假無線 AP 與中間人攻擊"
    elif q_id in [41, 48, 148]:
        return "MITRE 與網頁安全攻擊", "社交工程與釣魚"
    elif q_id in [42, 53, 54, 144, 145, 153, 159]:
        return "MITRE 與網頁安全攻擊", "憑證重用與防禦"
    elif q_id in [43, 49, 56, 143, 155]:
        return "MITRE 與網頁安全攻擊", "SQL 注入與防禦"
    elif q_id in [44, 55, 147, 149, 151]:
        return "MITRE 與網頁安全攻擊", "會話劫持與傳輸加密"
    elif q_id in [51, 146, 154]:
        return "MITRE 與網頁安全攻擊", "瀏覽器劫持與惡意擴充"
    elif q_id in [57, 58, 59, 60, 61, 62, 63, 69, 70, 71, 72, 73, 74, 75, 76, 77, 86, 101, 102, 103, 106, 107, 108, 121, 122, 123, 124, 125, 126, 127, 128, 129, 158]:
        return "MITRE 與網頁安全攻擊", "OWASP 網頁弱點與防禦"
        
    # Subject 3: Wireless & Bluetooth Security (無線網路與藍牙安全)
    elif q_id in [67, 68, 78, 79, 82, 83, 84, 85, 95, 96, 97, 104, 105, 109, 110, 114, 115, 116, 132, 133, 134, 139]:
        return "無線網路與藍牙安全", "Wi-Fi 安全與加密協定"
    elif q_id in [91, 92, 98, 99, 100, 111, 112, 118, 140]:
        return "無線網路與藍牙安全", "無線網路稽核與工具"
    elif q_id in [80, 81, 87, 88, 89, 90, 93, 94, 113, 117, 135, 136, 137, 138]:
        return "無線網路與藍牙安全", "藍牙安全性與漏洞"
    elif q_id in [64, 65, 66, 130, 131]:
        return "無線網路與藍牙安全", "頻譜與寬頻無線技術"
        
    # Heuristics fallback
    low_text = question_text.lower()
    if "wireless" in low_text or "wifi" in low_text or "802.11" in low_text or "ap" in low_text:
        return "無線網路與藍牙安全", "Wi-Fi 安全與加密協定"
    elif "bluetooth" in low_text or "blue" in low_text:
        return "無線網路與藍牙安全", "藍牙安全性與漏洞"
    elif "sql" in low_text or "injection" in low_text or "web" in low_text or "owasp" in low_text:
        return "MITRE 與網頁安全攻擊", "OWASP 網頁弱點與防禦"
    elif "mitre" in low_text or "tactic" in low_text or "technique" in low_text:
        return "MITRE 與網頁安全攻擊", "MITRE ATT&CK 框架"
    else:
        return "道德駭客與偵查技術", "其他安全主題"

def merge_options(options_list):
    merged = []
    for opt in options_list:
        if merged and opt.startswith(' '):
            merged[-1] = merged[-1] + ',' + opt
        else:
            merged.append(opt)
    return merged

def load_existing_classifications(output_dir):
    all_questions_path = os.path.join(output_dir, 'all_questions.csv')
    manifest_path = os.path.join(output_dir, 'manifest.json')
    
    q_map = {} # normalized_question_text -> (topic, subject, old_id)
    
    if not os.path.exists(all_questions_path) or not os.path.exists(manifest_path):
        return q_map
        
    try:
        # 1. Build topic -> subject map from manifest.json
        topic_to_subject = {}
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest_data = json.load(f)
            for item in manifest_data:
                subject = item.get("subject")
                for topic_item in item.get("topics", []):
                    topic = topic_item.get("title")
                    if topic and subject:
                        topic_to_subject[topic] = subject
                        
        # 2. Read all_questions.csv and map question text to topic/subject
        with open(all_questions_path, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for row in reader:
                q_text = row.get("question", "").strip()
                topic = row.get("topic", "").strip()
                old_id = row.get("id", "").strip()
                if q_text:
                    norm = "".join(c for c in q_text if c.isalnum()).lower()
                    subject = topic_to_subject.get(topic, "道德駭客與偵查技術")
                    q_map[norm] = {
                        "topic": topic,
                        "subject": subject,
                        "id": old_id
                    }
    except Exception as e:
        print(f"警告：讀取現有 question base 失敗: {e}")
        
    return q_map

def merge_questions():
    raw_dir = 'questions'
    output_dir = 'assets/data'
    output_file = os.path.join(output_dir, 'all_questions.csv')
    manifest_path = os.path.join(output_dir, 'manifest.json')
    
    all_questions = []
    seen_ids = set()
    subjects_info = {}

    if not os.path.exists(raw_dir):
        print(f"老哥，找不到 {raw_dir} 資料夾，你是噴到哪去了？")
        return
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # 載入已有的題庫分類資料以保持分類穩定
    existing_q_map = load_existing_classifications(output_dir)

    # 1. 處理 JSON 檔案
    json_files = [f for f in os.listdir(raw_dir) if f.endswith('.json')]
    for filename in json_files:
        file_path = os.path.join(raw_dir, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                questions_list = json.load(f)
                
                subject_name = filename.replace('.json', '').replace('_', ' ')
                
                for idx, q in enumerate(questions_list):
                    q_text = q.get("question", "").strip()
                    if not q_text:
                        continue
                    
                    topic = q.get("topic", "未分類 Vibe").strip()
                    q_id = q.get("id") or f"V{idx+1:03d}"
                    
                    temp_id = q_id
                    counter = 1
                    while temp_id in seen_ids:
                        temp_id = f"{q_id}_{counter}"
                        counter += 1
                    q_id = temp_id
                    seen_ids.add(q_id)

                    all_questions.append({
                        "id": q_id,
                        "question": q_text,
                        "options": q.get("options", []),
                        "answer": q.get("answer"),
                        "topic": topic,
                        "subject": subject_name
                    })
        except Exception as e:
            print(f"處理 JSON {filename} 出事了: {e}")

    # 2. 處理 multiple_choice.csv
    choice_path = os.path.join(raw_dir, 'multiple_choice.csv')
    if os.path.exists(choice_path):
        try:
            with open(choice_path, 'r', encoding='utf-8-sig') as f:
                reader = csv.reader(f)
                header = next(reader)
                for idx, row in enumerate(reader, 2):
                    if not row:
                        continue
                    
                    # 尋找答案欄位 (A, B, C, D)
                    ans_indices = [i for i, val in enumerate(row) if val.strip() in ['A', 'B', 'C', 'D']]
                    if not ans_indices:
                        print(f"警告：選擇題第 {idx} 行找不到答案，跳過。")
                        continue
                    
                    ans_idx = ans_indices[0]
                    q_text = ",".join(row[:ans_idx]).strip()
                    if not q_text:
                        continue
                    
                    correct_val = row[ans_idx].strip()
                    mapping = {'A': 1, 'B': 2, 'C': 3, 'D': 4}
                    answer = mapping.get(correct_val, 1)
                    
                    raw_options = row[ans_idx+1:]
                    options = merge_options(raw_options)
                    
                    # 嘗試與舊題庫配對以取得穩定分類與 ID
                    norm = "".join(c for c in q_text if c.isalnum()).lower()
                    if is_mitre_or_tool_question(q_text):
                        subject_name = "MITRE 與網頁安全攻擊"
                        topic_name = "常考 MITRE 技術與資安工具"
                        if norm in existing_q_map:
                            old_id = existing_q_map[norm]["id"]
                        else:
                            old_id = f"Q_new_mc_{idx}"
                    elif norm in existing_q_map:
                        subject_name = existing_q_map[norm]["subject"]
                        topic_name = existing_q_map[norm]["topic"]
                        if topic_name in ["其他安全主題", "未分類 Vibe", ""]:
                            subject_name, topic_name = classify_question(None, q_text)
                        old_id = existing_q_map[norm]["id"]
                    else:
                        subject_name, topic_name = classify_question(None, q_text)
                        old_id = f"Q_new_mc_{idx}"
                        
                    if old_id in seen_ids:
                        temp_id = old_id
                        counter = 1
                        while temp_id in seen_ids:
                            temp_id = f"{old_id}_{counter}"
                            counter += 1
                        old_id = temp_id
                    
                    all_questions.append({
                        "id": old_id,
                        "question": q_text,
                        "options": options,
                        "answer": answer,
                        "topic": topic_name,
                        "subject": subject_name
                    })
                    seen_ids.add(old_id)
        except Exception as e:
            print(f"處理 multiple_choice.csv 出事了: {e}")

    # 3. 處理 true_false.csv
    tf_path = os.path.join(raw_dir, 'true_false.csv')
    if os.path.exists(tf_path):
        try:
            with open(tf_path, 'r', encoding='utf-8-sig') as f:
                reader = csv.reader(f)
                header = next(reader)
                for idx, row in enumerate(reader, 2):
                    if not row or len(row) < 2:
                        continue
                    
                    q_text = ",".join(row[:-1]).strip()
                    if not q_text:
                        continue
                    
                    correct_val = row[-1].strip().upper()
                    answer = 1 if correct_val in ['T', 'TRUE'] else 2
                    options = ["True", "False"]
                    
                    # 嘗試與舊題庫配對以取得穩定分類與 ID
                    norm = "".join(c for c in q_text if c.isalnum()).lower()
                    if is_mitre_or_tool_question(q_text):
                        subject_name = "MITRE 與網頁安全攻擊"
                        topic_name = "常考 MITRE 技術與資安工具"
                        if norm in existing_q_map:
                            old_id = existing_q_map[norm]["id"]
                        else:
                            old_id = f"Q_new_tf_{idx}"
                    elif norm in existing_q_map:
                        subject_name = existing_q_map[norm]["subject"]
                        topic_name = existing_q_map[norm]["topic"]
                        if topic_name in ["其他安全主題", "未分類 Vibe", ""]:
                            subject_name, topic_name = classify_question(None, q_text)
                        old_id = existing_q_map[norm]["id"]
                    else:
                        subject_name, topic_name = classify_question(None, q_text)
                        old_id = f"Q_new_tf_{idx}"
                        
                    if old_id in seen_ids:
                        temp_id = old_id
                        counter = 1
                        while temp_id in seen_ids:
                            temp_id = f"{old_id}_{counter}"
                            counter += 1
                        old_id = temp_id
                    
                    all_questions.append({
                        "id": old_id,
                        "question": q_text,
                        "options": options,
                        "answer": answer,
                        "topic": topic_name,
                        "subject": subject_name
                    })
                    seen_ids.add(old_id)
        except Exception as e:
            print(f"處理 true_false.csv 出事了: {e}")

    # 計算各科目與主題的題目數量並排序
    for q in all_questions:
        sub = q["subject"]
        top = q["topic"]
        if sub not in subjects_info:
            subjects_info[sub] = {}
        if top not in subjects_info[sub]:
            subjects_info[sub][top] = 0
        subjects_info[sub][top] += 1

    # 排序：按 ID 排序 (可以讓題目順序一致)
    all_questions.sort(key=lambda x: x['id'])

    # 重新編號：讓 Q 開頭的題目 ID 從 Q0 開始
    q_counter = 0
    for q in all_questions:
        if q["id"].startswith("Q"):
            q["id"] = f"Q{q_counter}"
            q_counter += 1

    # 輸出到 CSV 檔
    with open(output_file, 'w', encoding='utf-8-sig', newline='') as f:
        fieldnames = ['id', 'question', 'options', 'answer', 'topic']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for q in all_questions:
            writer.writerow({
                'id': q['id'],
                'question': q['question'],
                'options': json.dumps(q['options'], ensure_ascii=False),
                'answer': json.dumps(q['answer'], ensure_ascii=False),
                'topic': q['topic']
            })
    
    # 建立 manifest.json (按 Subject 和 Topic 進行階層結構組織)
    formatted_manifest = []
    
    # 為了畫面顯示一致性，我們可以把 Subjects 進行排序
    sorted_subjects = sorted(subjects_info.keys())
    
    for sub in sorted_subjects:
        topics = subjects_info[sub]
        sub_total = sum(topics.values())
        topics_list = []
        
        # 排序 topics 提升美感與結構
        sorted_topics = sorted(topics.keys())
        for top in sorted_topics:
            count = topics[top]
            topics_list.append({
                "title": top,
                "count": count,
                "full_topic": top
            })
        
        formatted_manifest.append({
            "subject": sub,
            "count": sub_total,
            "full_topic": sub,
            "topics": topics_list
        })
    
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(formatted_manifest, f, indent=4, ensure_ascii=False)

    print(f"成功合併 {len(all_questions)} 題。Vibe 能量滿點！")

if __name__ == "__main__":
    merge_questions()
