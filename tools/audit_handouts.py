# -*- coding: utf-8 -*-
import csv
import json
import os

def main():
    csv_path = 'assets/data/all_questions.csv'
    if not os.path.exists(csv_path):
        print("all_questions.csv not found")
        return

    questions_by_topic = {}
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            topic = row['topic']
            if topic not in questions_by_topic:
                questions_by_topic[topic] = []
            questions_by_topic[topic].append(row)

    for topic, qs in sorted(questions_by_topic.items()):
        print(f"\n==================================================")
        print(f"Topic: {topic} ({len(qs)} questions)")
        print(f"==================================================")
        for q in qs:
            ans_index = json.loads(q['answer'])
            options = json.loads(q['options'])
            
            # answer normalization
            ans_str = ""
            if isinstance(ans_index, int):
                # 1-based index in all_questions.csv
                if 1 <= ans_index <= len(options):
                    ans_str = options[ans_index - 1]
                else:
                    ans_str = str(ans_index)
            else:
                ans_str = str(ans_index)
                
            print(f"- [{q['id']}] {q['question']}")
            print(f"  Options: {options}")
            print(f"  Answer: {ans_str}")

if __name__ == '__main__':
    main()
