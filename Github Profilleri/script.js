const searchGithub = async () => { // searchGithub adında bir asenkron fonksiyon oluşturuluyor.
    const username = document.getElementById("searchInput").value; //HTML sayfasındaki "searchInput" adlı input elemanının değerini alır. Bu, kullanıcının girdiği GitHub kullanıcı adını temsil eder.

    const response = await fetch(`https://api.github.com/users/${username}`); // fetch fonksiyonu kullanılarak GitHub API'sine HTTP GET isteği gönderilir. Kullanıcının girdiği kullanıcı adına göre ilgili GitHub kullanıcısının bilgilerini almak için API'nin URL'si oluşturulur.

    const detailsContainer = document.querySelector(".details"); //.details sınıfına sahip HTML öğesini seçer. Bu öğe, GitHub kullanıcısının detaylarını içeren bölümü temsil eder.

    const data = await response.json(); //GitHub API'den gelen yanıtın JSON formatındaki içeriğini alır ve bu içeriği data adlı değişkene atar.

    if(response.ok){ // HTTP yanıtının başarılı olup olmadığını kontrol eder.
        detailsContainer.style.display = "flex"; //Detay bölümünü görünür hale getirir.
        
        //"result" adlı HTML öğesinin içeriğini günceller. Bu içerik, GitHub kullanıcısının profiline ait bilgileri ve istatistikleri içerir.
        document.getElementById("result").innerHTML = `
            <div class="profile">
                <div class="profile-image">
                    <img src="${data.avatar_url}">
                </div>
                <div class="profile-details">
                    <h2 class="name"> ${data.name || data.login}</h2>
                    <p class="username">@${data.login}</p>
                    <p class="bio"> ${data.bio || "Bu kullanıcıya ait biyografi bulunamadı.."}</p>

                    <div class="stats">
                        <div>
                            <div class="stats-name">Public Repo Sayısı</div>
                            <div class="stats-value">${data.public_repos}</div>
                        </div>
                        
                        <div>
                            <div class="stats-name">Takipçi Sayısı</div>
                            <div class="stats-value">${data.followers}</div>
                        </div>
                        
                        <div>
                            <div class="stats-name">Takip Edilen Sayısı</div>
                            <div class="stats-value">${data.following}</div>
                        </div>
                    </div>

                    <div class="media">
                        <p>
                            <span class="media-name">Konum : </span>
                            <span class="media-value">
                                ${data.location || "Bilgi Yok"}
                            </span>
                        </p>
                        <p>
                            <span class="media-name">Blog Hesabı :</span>
                            <span class="media-value">
                                ${data.blog || "Bilgi Yok"}
                            </span>
                        </p>
                        <p>
                            <span class="media-name">Twitter Hesabı : @</span>
                            <span class="media-value">
                                ${data.twitter_username || "Bilgi Yok"}
                            </span>
                        </p>
                        <p>
                            <span class="media-name">Şirket : </span>
                            <span class="media-value">
                                ${data.company || "Bilgi Yok"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        `;


    }else{
        alert(data.message); // Eğer API'den gelen yanıt başarısızsa, kullanıcıya bir hata mesajı gösterilir.
    }
};