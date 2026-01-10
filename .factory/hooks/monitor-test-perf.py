#!/usr/bin/env python3
"""
Monitor test execution time and report slow tests.
"""
import json
import sys
import subprocess
import time
import re

# Slow test threshold in seconds
SLOW_TEST_THRESHOLD = 5.0

def run_tests_with_timing(test_file):
    """Run tests and capture timing information."""
    start_time = time.time()
    
    try:
        result = subprocess.run(
            ['npm', 'test', '--', test_file, '--verbose'],
            capture_output=True,
            text=True,
            timeout=60
        )
        
        elapsed = time.time() - start_time
        
        # Parse test output for individual test times
        slow_tests = []
        for line in result.stdout.split('\n'):
            # Look for test timing info
            match = re.search(r'(.*?)\s+\((\d+)ms\)', line)
            if match:
                test_name = match.group(1).strip()
                test_time_ms = int(match.group(2))
                test_time_s = test_time_ms / 1000.0
                
                if test_time_s > SLOW_TEST_THRESHOLD:
                    slow_tests.append((test_name, test_time_s))
        
        return elapsed, slow_tests, result.returncode
        
    except subprocess.TimeoutExpired:
        return None, [], 1

try:
    input_data = json.load(sys.stdin)
    file_path = input_data.get('tool_input', {}).get('file_path', '')
    
    if not file_path or not file_path.endswith(('.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx')):
        sys.exit(0)
    
    print(f"⏱️  Monitoring test performance for {file_path}...")
    
    elapsed, slow_tests, returncode = run_tests_with_timing(file_path)
    
    if elapsed is not None:
        print(f"\nTotal test time: {elapsed:.2f}s")
        
        if slow_tests:
            print(f"\n⚠️  Found {len(slow_tests)} slow test(s):")
            for test_name, test_time in slow_tests:
                print(f"  - {test_name}: {test_time:.2f}s")
            print("\nConsider optimizing these tests or mocking expensive operations.")
        else:
            print("✓ All tests running within acceptable time")
        
        # Don't block on slow tests, just warn
        sys.exit(returncode)
    else:
        print("❌ Tests timed out", file=sys.stderr)
        sys.exit(2)
        
except Exception as e:
    print(f"Error monitoring tests: {e}", file=sys.stderr)
    sys.exit(0)