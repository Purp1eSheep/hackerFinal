# -*- coding: utf-8 -*-
import json
import os
import csv
import sys
import copy

# 加入當前目錄到 python path 以便載入 generate_handouts
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from generate_handouts import HANDOUTS

# 同步 merge_questions.py 中的分類邏輯
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
        return "道德駭客與偵查技術", "道德駭客基礎與法規"

def load_questions():
    questions_by_topic = {}
    all_questions_path = 'assets/data/all_questions.csv'
    if os.path.exists(all_questions_path):
        try:
            with open(all_questions_path, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    q_id = row.get('id')
                    q_text = row.get('question')
                    options = json.loads(row.get('options') or '[]')
                    answer = json.loads(row.get('answer') or '0')
                    # Normalize to 0-based index
                    if isinstance(answer, int):
                        answer = answer - 1
                    elif isinstance(answer, list):
                        answer = [a - 1 if isinstance(a, int) else a for a in answer]
                    
                    # 依據與 merge_questions.py 一致的邏輯重新歸類 topic
                    numeric_id = q_id.replace('Q', '')
                    _, topic_name = classify_question(numeric_id, q_text)
                    
                    if topic_name not in questions_by_topic:
                        questions_by_topic[topic_name] = []
                    
                    questions_by_topic[topic_name].append({
                        "id": q_id,
                        "question": q_text,
                        "options": options,
                        "answer": answer
                    })
        except Exception as e:
            print(f"Error reading all_questions.csv: {e}")
    return questions_by_topic

def main():
    questions_by_topic = load_questions()
    
    # 複製講義資料
    handouts = copy.deepcopy(HANDOUTS)

    # 合併題目資料到講義中
    for h in handouts:
        topic = h["topic"]
        related_q = questions_by_topic.get(topic, [])
        # 限制只取前 4 題
        h["questions"] = related_q[:4]

    # 輸出 js 檔案
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'handouts')
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    output_file = os.path.join(output_dir, 'handouts-data.js')
    
    js_content = f"// 本檔案由 Python 自動生成。內含講義文字與各主題的精選關聯題目。\nconst HANDOUTS_DATA = {json.dumps(handouts, indent=4, ensure_ascii=False)};\n\nif (typeof module !== 'undefined' && module.exports) {{\n    module.exports = HANDOUTS_DATA;\n}} else {{\n    window.HANDOUTS_DATA = HANDOUTS_DATA;\n}}"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"成功合併講義與題庫，並輸出至 {output_file}！")

if __name__ == '__main__':
    main()
