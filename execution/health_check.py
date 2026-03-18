import os
import sys
import json
from datetime import datetime

def check_directives():
    return os.path.isdir('directives') and os.access('directives', os.R_OK)

def check_tmp_writable():
    tmp_dir = '.tmp'
    if not os.path.exists(tmp_dir):
        try:
            os.makedirs(tmp_dir)
        except Exception:
            return False
    
    test_file = os.path.join(tmp_dir, '.write_test')
    try:
        with open(test_file, 'w') as f:
            f.write('test')
        os.remove(test_file)
        return True
    except Exception:
        return False

def check_env_initialized():
    return os.path.isfile('.env')

def run_health_check():
    checks = {
        'directives_accessible': check_directives(),
        'tmp_writable': check_tmp_writable(),
        'python_version': sys.version,
        'env_initialized': check_env_initialized()
    }
    
    all_passed = all([
        checks['directives_accessible'],
        checks['tmp_writable'],
        checks['env_initialized']
    ])
    
    status = "success" if all_passed else "partial_failure"
    
    report = {
        'status': status,
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'checks': checks
    }
    
    report_path = os.path.join('.tmp', 'health_report.json')
    with open(report_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"Health report saved to {report_path}")
    return report

if __name__ == "__main__":
    run_health_check()
