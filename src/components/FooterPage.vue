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
                    <div class="nav-menu">
                    <div class="m-3 d-flex justify-content-center">
                        <h4 class="nav-item"><router-link class="nav-link" to="/">Home</router-link></h4>
                        <h4 class="nav-item"><router-link class="nav-link" to="/articleList">게시글</router-link></h4>
                        <h4 class="nav-item"><router-link class="nav-link" to="/attractionPage">관광지</router-link></h4>
                        <h4 class="nav-item"><router-link class="nav-link" to="/path">길찾기</router-link></h4>
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

<style scoped>
.nav-menu {
        padding: 15px; /* 여백을 조절하세요 */
        border-radius: 5px; /* 필요에 따라 조절하세요 */
    }

    .nav-item {
        margin-right: 15px; /* 각 메뉴 아이템 간의 간격을 조절하세요 */
    }

    .nav-link {
        color: #ffffff; /* 텍스트 색상을 변경하세요 */
        text-decoration: none;
        font-size: 18px; /* 폰트 크기를 조절하세요 */
        font-weight: bold; /* 폰트 두께를 조절하세요 */
    }

    .nav-link:hover {
        color: #f8f9fa; /* 호버 시 텍스트 색상을 변경하세요 */
    }
</style>
