using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tree.Api.Dto;
using Tree.Api.Service;

namespace Tree.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeController : ControllerBase
    {
        private readonly TreeService _treeService;

        public TreeController(TreeService treeService)
        {
            _treeService = treeService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var structure = _treeService.Get();
            return Ok(structure);
        }

        [HttpPost]
        public IActionResult Add(TreeDto treeDto)
        {
            var tree = _treeService.Add(treeDto);
            return Ok(tree);
        }

        [HttpPut]
        public IActionResult Update(TreeDto treeDto)
        {
            _treeService.Update(treeDto);
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete(int id)
        {
            _treeService.Delete(id);
            return Ok();
        }
    }
}
