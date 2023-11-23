<template>
    <footer class="site-footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="widget">
                        <h3 class="mb-4">About</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                            live the blind texts.</p>
                    </div>


                </div>
                <div class="col-lg-4 ps-lg-5">
                    <div>
                        <div class="m-3 d-flex justify-content-center">
                            <h3 class="mb-4 ">Link</h3>
                            <h4 style="text-decoration: none;"><router-link to=" /"> home </router-link></h4>
                            <h4><router-link to="/articleList">게시글 </router-link></h4>
                            <h4><router-link to="/attractionPage">관광지 </router-link></h4>
                            <h4><router-link to="/path">길찾기</router-link></h4>
                        </div>
                    </div>
                    <!-- /.widget -->
                </div>
                <!-- /.col-lg-4 -->

                <!-- /.col-lg-4 -->
            </div>
            <!-- /.row -->

            <div class="row mt-5">
                <div class="col-12 text-center">
                    <p>
                        Copyright &copy; . All Rights Reserved. &mdash; Designed with love by <a
                            href="https://untree.co">Untree.co</a> Distributed by
                        <a href="https://themewagon.com">ThemeWagon</a>
                        <!-- License information: https://untree.co/license/ -->
                    </p>
                </div>
            </div>
        </div>
        <!-- /.container -->
    </footer>
</template>
<script setup>
import { useRouter } from "vue-router";
</script>
