import json
import os
import csv

def merge_questions():
    """
    Vibe Merger: 老哥我根本看不懂 Python，
    但這段 code 能自動把 questions 資料夾裡的 JSON 揉成一個 CSV。
    """
    raw_dir = 'questions'
    output_dir = 'assets/data'
    output_file = os.path.join(output_dir, 'all_questions.csv')
    manifest_path = os.path.join(output_dir, 'manifest.json')
    
    all_questions = []
    
    if not os.path.exists(raw_dir):
        print(f"老哥，找不到 {raw_dir} 資料夾，你是噴到哪去了？")
        return
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # 自動掃描所有 JSON 檔案，這才叫 Vibe
    json_files = [f for f in os.listdir(raw_dir) if f.endswith('.json')]
    
    subjects_info = {}

    for filename in json_files:
        file_path = os.path.join(raw_dir, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                questions_list = json.load(f)
                
                # 假設檔名就是科目名稱 (去底線)
                subject_name = filename.replace('.json', '').replace('_', ' ')
                if subject_name not in subjects_info:
                    subjects_info[subject_name] = {}

                for q in questions_list:
                    q_text = q.get("question", "").strip()
                    if not q_text: continue
                    
                    topic = q.get("topic", "未分類 Vibe").strip()
                    if topic not in subjects_info[subject_name]:
                        subjects_info[subject_name][topic] = 0
                    subjects_info[subject_name][topic] += 1
                    
                    all_questions.append({
                        "question": q_text,
                        "options": q.get("options"),
                        "answer": q.get("answer"),
                        "topic": topic,
                        "subject": subject_name
                    })
        except Exception as e:
            print(f"處理 {filename} 出事了，但我看不懂報錯： {e}")

    # 排序並給 ID
    all_questions.sort(key=lambda x: x['question'])
    for i, q in enumerate(all_questions):
        q['id'] = f"V{i+1:03d}"

    # 噴出 CSV
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
    
    # 建立 manifest.json
    formatted_manifest = []
    for sub, topics in subjects_info.items():
        sub_total = sum(topics.values())
        topics_list = []
        for top, count in topics.items():
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
