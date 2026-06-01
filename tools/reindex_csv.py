# -*- coding: utf-8 -*-
import csv
import json
import os
import subprocess

def reindex_csv():
    csv_path = 'assets/data/all_questions.csv'
    if not os.path.exists(csv_path):
        print(f"找不到檔案：{csv_path}")
        return

    print(f"正在讀取並重新編號：{csv_path}...")
    
    rows = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            rows.append(row)
            
    # 對所有 Q 開頭的 ID 進行重新編號（從 Q0 開始）
    q_counter = 0
    for row in rows:
        q_id = row.get('id', '')
        if q_id.startswith('Q'):
            row['id'] = f"Q{q_counter}"
            q_counter += 1

    # 寫回 CSV 檔案
    with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
            
    print(f"成功將 {q_counter} 個題目重新編號為 Q0 ~ Q{q_counter - 1}！")
    
    # 自動執行 handouts 數據更新以確保同步
    handout_script = 'tools/generate_handout_site_data.py'
    if os.path.exists(handout_script):
        print("偵測到講義編譯指令碼，正在進行同步更新...")
        try:
            subprocess.run(['python3', handout_script], check=True)
            print("講義網站數據已成功與新編號同步！")
        except Exception as e:
            print(f"同步更新講義資料出錯：{e}")

if __name__ == '__main__':
    reindex_csv()
