import json
import os
import csv

def classify_question(q_id, question_text):
    try:
        q_id = int(q_id)
    except ValueError:
        return "道德駭客與偵查技術", "其他安全主題"
    
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

    # 2. 處理 choice.csv
    choice_path = os.path.join(raw_dir, 'choice.csv')
    if os.path.exists(choice_path):
        try:
            with open(choice_path, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    raw_id = (row.get('ID') or '').strip()
                    if not raw_id:
                        continue
                    
                    q_id = f"Q{int(raw_id):03d}"
                    if q_id in seen_ids:
                        continue
                    
                    q_text = (row.get('Question') or '').strip()
                    q_type = (row.get('Question_Type') or '').strip()
                    
                    # 判斷是否為是非題
                    opt_a = (row.get('Option_A') or '').strip()
                    opt_b = (row.get('Option_B') or '').strip()
                    opt_c = (row.get('Option_C') or '').strip()
                    opt_d = (row.get('Option_D') or '').strip()
                    
                    if q_type == 'True/False' or (not opt_a and not opt_b):
                        options = ["True", "False"]
                        correct_val = (row.get('Correct_Answer') or '').strip().upper()
                        answer = 1 if correct_val in ['T', 'TRUE'] else 2
                    else:
                        # 選擇題
                        options = [opt_a, opt_b, opt_c, opt_d]
                        # 過濾空選項
                        options = [opt for opt in options if opt]
                        correct_val = (row.get('Correct_Answer') or '').strip().upper()
                        mapping = {'A': 1, 'B': 2, 'C': 3, 'D': 4}
                        answer = mapping.get(correct_val, 1)
                    
                    subject_name, topic_name = classify_question(raw_id, q_text)
                    
                    all_questions.append({
                        "id": q_id,
                        "question": q_text,
                        "options": options,
                        "answer": answer,
                        "topic": topic_name,
                        "subject": subject_name
                    })
                    seen_ids.add(q_id)
        except Exception as e:
            print(f"處理 choice.csv 出事了: {e}")

    # 3. 處理 truefalse.csv
    tf_path = os.path.join(raw_dir, 'truefalse.csv')
    if os.path.exists(tf_path):
        try:
            with open(tf_path, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    raw_id = (row.get('ID') or '').strip()
                    if not raw_id:
                        continue
                    
                    q_id = f"Q{int(raw_id):03d}"
                    if q_id in seen_ids:
                        continue
                    
                    q_text = (row.get('Question') or '').strip()
                    options = ["True", "False"]
                    correct_val = (row.get('Correct_Answer') or '').strip().upper()
                    answer = 1 if correct_val in ['T', 'TRUE'] else 2
                    
                    subject_name, topic_name = classify_question(raw_id, q_text)
                    
                    all_questions.append({
                        "id": q_id,
                        "question": q_text,
                        "options": options,
                        "answer": answer,
                        "topic": topic_name,
                        "subject": subject_name
                    })
                    seen_ids.add(q_id)
        except Exception as e:
            print(f"處理 truefalse.csv 出事了: {e}")

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
