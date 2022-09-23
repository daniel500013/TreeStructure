using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Text;
using Tree.Api;
using Tree.Api.Dto;

namespace Tree.Tests
{
    public class TreeController
    {
        private HttpClient Client { get; set; }

        public TreeController()
        {
            var factory = new WebApplicationFactory<Program>();
            Client = factory
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        var dbContext = services
                            .SingleOrDefault(x => x.ServiceType == typeof(DbContextOptions<TreeDbContext>));
                        services.Remove(dbContext);

                        services.AddDbContext<TreeDbContext>(options => options.UseInMemoryDatabase("TreeDb"));
                    });
                })
                .CreateClient();
        }

        [Fact]
        public async Task GetTree_WithourParams_ReturnOkRequest()
        {
            var response = await Client.GetAsync("/api/Tree");

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task CreateTreeFolder_WithoutParams_ReturnOkRequest()
        {
            //Add Tree
            var treeDto = new TreeDto()
            {
                TreeID = 1,
                Name = "qwerty",
                ParentID = 1
            };

            var treeJson = JsonConvert.SerializeObject(treeDto);

            var treeContext = new StringContent(treeJson, Encoding.UTF8, "application/json");

            var response = await Client.PostAsync("/api/Tree", treeContext);

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task PutTreeFolder_WithoutParams_ReturnOkRequest()
        {
            //Add tree
            var treeDto = new TreeDto()
            {
                TreeID = 1,
                Name = "qwerty",
                ParentID = 1
            };

            var treeJson = JsonConvert.SerializeObject(treeDto);

            var treeContext = new StringContent(treeJson, Encoding.UTF8, "application/json");

            await Client.PostAsync("/api/Tree", treeContext);

            //Change tree
            var newTreeDto = new TreeDto()
            {
                TreeID = 1,
                Name = "Test",
                ParentID = 1
            };

            var newTreeJson = JsonConvert.SerializeObject(newTreeDto);

            var newTreeContext = new StringContent(newTreeJson, Encoding.UTF8, "application/json");

            var response = await Client.PutAsync("/api/Tree", newTreeContext);

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }

        [Fact]
        public async Task DeleteTreeFolder_WithoutParams_ReturnOkRequest()
        {
            //Add tree
            var treeDto = new TreeDto()
            {
                TreeID = 1,
                Name = "qwerty",
                ParentID = 1
            };

            var treeJson = JsonConvert.SerializeObject(treeDto);

            var treeContext = new StringContent(treeJson, Encoding.UTF8, "application/json");

            await Client.PostAsync("/api/Tree", treeContext);

            //Change tree
            var response = await Client.DeleteAsync("/api/Tree/2");

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        }
    }
}