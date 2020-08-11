--  TYPICALLY YOU WILL WANT TO KEEP TRACK OF ALL THE QUERIES YOU ARE WORKING ON
--  this acts as a log so you know what you did / were doing / trying to do
--  can be used as a reference if things get messed up
--  recommended by Luis after years of database experience

--  list of all products
SELECT * FROM PRODUCTS; 

select productId, productName
from products; 
  select ProductName, Price, Unit
  from products;

--  list of all customers in the UK
select *
from customers
where country = 'UK';  -- this sample DB has case sensitive string comparisons

--  list of all customers in UK or Berlin
SELECT *
FROM customers
WHERE Country='UK' or City='Berlin'; 

--  list of all customers from the UK and USA
SELECT *
FROM customers
WHERE Country='UK' or Country="USA"; 

--  list of all customers from the UK and USA
select *
from customers
where country IN ('UK', 'USA')

--  add a new shipping company
insert into shippers(phone, shipperName)
values ('(502)555-1234', 'My Shipping Co.')