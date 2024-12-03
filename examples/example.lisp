;; Common Lisp示例：展示S表达式和函数式编程特性

;; 定义函数
(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

;; 列表操作和高阶函数
(defun double-numbers (numbers)
  (mapcar #'(lambda (x) (* x 2)) numbers))

;; 宏定义
(defmacro when-positive (test &rest body)
  `(when (> ,test 0)
     ,@body))

;; 使用let绑定局部变量
(let ((x 10)
      (y 20))
  (format t "Sum: ~A" (+ x y)))
