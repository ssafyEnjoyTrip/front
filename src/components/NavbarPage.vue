<template>    
    <nav class="site-nav">
        <div class="container">
            <div class="menu-bg-wrap">
                <div class="site-navigation">
                    <div class="row g-0 align-items-center">
                        <div class="col-2">
                            <router-link to="/" class="logo m-0 float-start" >home</router-link>
                            
                        </div>
                        <div class="col-8 text-center">
                            <form action="#" class="search-form d-inline-block d-lg-none">
                                <input type="text" class="form-control" placeholder="Search..." />
                                <span class="bi-search"></span>
                            </form>

                            <ul class="js-clone-nav d-none d-lg-inline-block text-start site-menu mx-auto">
                                <li class="active">                                    
                                    <router-link to="/">home</router-link>
                                </li>
                                <li class="has-children">
                                    <router-link to="/category">pages</router-link>
                                    
                                    <ul class="dropdown">
                                        <li><router-link to="/searchResult">Search Result</router-link></li>
                                        <li><router-link to="/blog">Blog</router-link></li>
                                        <li><router-link to="/single">Blog Single</router-link></li>
                                        <li><router-link to="/category">Category</router-link></li>
                                        <li><router-link to="/about">About</router-link></li>
                                        <li><router-link to="/contact">Cantact Us</router-link></li>                                        
                                        <li><a href="#">Menu One</a></li>
                                        <li><a href="#">Menu Two</a></li>
                                        <li class="has-children">
                                            <a href="#">Dropdown</a>
                                            <ul class="dropdown">
                                                <li><a href="#">Sub Menu One</a></li>
                                                <li><a href="#">Sub Menu Two</a></li>
                                                <li><a href="#">Sub Menu Three</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><router-link to="/category">Culture</router-link></li>
                                <li><router-link to="/category">Business</router-link></li>
                                <li><router-link to="/category">Politics</router-link></li>
   
                            </ul>
                        </div>
                        <div class="col-2 text-end">
                            <a href="#" class="burger ms-auto float-end site-menu-toggle js-menu-toggle d-inline-block d-lg-none light">
                                <span></span>
                            </a>
                            <form action="#" class="search-form d-none d-lg-inline-block">
                                <input type="text" class="form-control" placeholder="Search..." />
                                <span class="bi-search"></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
