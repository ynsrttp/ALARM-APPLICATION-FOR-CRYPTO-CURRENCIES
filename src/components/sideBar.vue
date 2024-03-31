<template>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">


<nav class="sidebar">
    <ul>
        <li>
            <a href="#section1">
                <span class="simge"><i class="fa-solid fa-house-chimney"></i></span>
                <span class="baslik">HOME</span>
            </a>
        </li>
        
        <li>
            <a href="#section2">
                <span class="simge"><i class="fa-solid fa-tv"></i></span>
                <span class="baslik">WATCH LIST</span>
            </a>
        </li>
        
        <li>
            <a href="#section3">
                <span class="simge"><i class="fa-regular fa-bell"></i></span>
                <span class="baslik">ALERTS</span>
            </a>
        </li>
        
        <li>
            <a href="#section4">
                <span class="simge"><i class="fa-solid fa-wallet"></i></span>
                <span class="baslik">PORTFOLIO</span>
            </a>
        </li>       

        <li>
            <a href="#section5">
                <span class="simge"><i class="fa-solid fa-chart-simple"></i></span>
                <span class="baslik">ON CHAIN</span>
            </a>
        </li>        
       
    </ul>
  </nav>

</template>

<style>

*{
    margin: 0;
    padding: 0;
    z-index: 1000;

}   

.sidebar{

    position: fixed;
    width: 50px;
    height: 100%;
    background: black;
    transition: .5s;
    overflow: hidden;  
    z-index: 1000;      

}

.sidebar:hover{

    width: 156px;

}

.sidebar ul{

    width: 100%;
    margin-top: 200px;

}

.sidebar ul li{

    width: 100%;
    list-style: none;
   
}

.sidebar ul li:hover{
    background: rgb(70, 178, 211);

}

.sidebar ul li a{

    display: flex;
    text-decoration: none;
    color: red;        
    margin-top: 40px;
    
}

.sidebar ul li a .simge{

    display: block;
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;

}

.sidebar ul li a i{

    font-size: 25px;

}

.sidebar ul li a .baslik{

    display: block;
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    white-space: nowrap;
        
}

section{
        
    width: 96%;
    height: 100vh;
    background-color: black;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    box-sizing: border-box; 
    z-index: 1;          
        
}

#section1{
        
    color: white;      
    height: 7600px;
    z-index: 1;
        
}

    #section2{

    position: relative;
    z-index: 1;
}

#section3{
    background: red;
    position: relative;
    z-index: 1;

}

#section4{
    
    background: black;
    position: relative;
    z-index: 1;
    overflow: hidden;

}   

#section5{
    
    background: white;
    position: relative;
    z-index: 1;
    display: flex;
        
}

</style>

<script>
import $ from 'jquery'; 

export default {
  mounted() {
  
    $(document).ready(function(){
    $("a").click(function(){
        var adres = $(this).attr("href");
        
        if(adres !=""){
            var target = $(adres);
            var scrollTo = target.offset().top - ($(window).height() - target.outerHeight()) / 2;
            $("html,body").animate({
                scrollTop: $(adres).offset().top 
            },1200);
        }
    })
})

  }
};
</script>

