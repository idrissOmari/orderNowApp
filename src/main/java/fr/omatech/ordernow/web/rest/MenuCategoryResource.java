package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.service.MenuCategoryService;
import fr.omatech.ordernow.web.rest.errors.BadRequestAlertException;
import fr.omatech.ordernow.service.dto.MenuCategoryDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.omatech.ordernow.domain.MenuCategory}.
 */
@RestController
@RequestMapping("/api")
public class MenuCategoryResource {

    private final Logger log = LoggerFactory.getLogger(MenuCategoryResource.class);

    private static final String ENTITY_NAME = "menuCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MenuCategoryService menuCategoryService;

    public MenuCategoryResource(MenuCategoryService menuCategoryService) {
        this.menuCategoryService = menuCategoryService;
    }

    /**
     * {@code POST  /menu-categories} : Create a new menuCategory.
     *
     * @param menuCategoryDTO the menuCategoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new menuCategoryDTO, or with status {@code 400 (Bad Request)} if the menuCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/menu-categories")
    public ResponseEntity<MenuCategoryDTO> createMenuCategory(@RequestBody MenuCategoryDTO menuCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save MenuCategory : {}", menuCategoryDTO);
        if (menuCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new menuCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MenuCategoryDTO result = menuCategoryService.save(menuCategoryDTO);
        return ResponseEntity.created(new URI("/api/menu-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /menu-categories} : Updates an existing menuCategory.
     *
     * @param menuCategoryDTO the menuCategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated menuCategoryDTO,
     * or with status {@code 400 (Bad Request)} if the menuCategoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the menuCategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/menu-categories")
    public ResponseEntity<MenuCategoryDTO> updateMenuCategory(@RequestBody MenuCategoryDTO menuCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update MenuCategory : {}", menuCategoryDTO);
        if (menuCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MenuCategoryDTO result = menuCategoryService.save(menuCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, menuCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /menu-categories} : get all the menuCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of menuCategories in body.
     */
    @GetMapping("/menu-categories")
    public List<MenuCategoryDTO> getAllMenuCategories() {
        log.debug("REST request to get all MenuCategories");
        return menuCategoryService.findAll();
    }

    /**
     * {@code GET  /menu-categories/:id} : get the "id" menuCategory.
     *
     * @param id the id of the menuCategoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the menuCategoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/menu-categories/{id}")
    public ResponseEntity<MenuCategoryDTO> getMenuCategory(@PathVariable Long id) {
        log.debug("REST request to get MenuCategory : {}", id);
        Optional<MenuCategoryDTO> menuCategoryDTO = menuCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(menuCategoryDTO);
    }

    /**
     * {@code DELETE  /menu-categories/:id} : delete the "id" menuCategory.
     *
     * @param id the id of the menuCategoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/menu-categories/{id}")
    public ResponseEntity<Void> deleteMenuCategory(@PathVariable Long id) {
        log.debug("REST request to delete MenuCategory : {}", id);
        menuCategoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
