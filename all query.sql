/*select all column query(select * all from table where (condition))*/
/*select * from bitproject.employee*/

/*selected column query*/
/*select e.empno from bitproject.employee as e;*/

/*max */
/*select max(e.empno) from bitproject.employee as e;*/

/*concat*/
/*select max(e.empno)+1 as empno from bitproject.employee as e;*/

/*concat*/
/*select lpad((max(e.empno)+1,10,'0')) from bitproject.employee as e;*/

/*select concat('E',lpad(substring(max(e.empno),2)+1,10,'0')) as EmpNo from bitproject.employee as e;*/