package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.OrderNowApp;
import fr.omatech.ordernow.domain.MenuCategory;
import fr.omatech.ordernow.repository.MenuCategoryRepository;
import fr.omatech.ordernow.service.MenuCategoryService;
import fr.omatech.ordernow.service.dto.MenuCategoryDTO;
import fr.omatech.ordernow.service.mapper.MenuCategoryMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MenuCategoryResource} REST controller.
 */
@SpringBootTest(classes = OrderNowApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MenuCategoryResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private MenuCategoryRepository menuCategoryRepository;

    @Autowired
    private MenuCategoryMapper menuCategoryMapper;

    @Autowired
    private MenuCategoryService menuCategoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMenuCategoryMockMvc;

    private MenuCategory menuCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MenuCategory createEntity(EntityManager em) {
        MenuCategory menuCategory = new MenuCategory()
            .label(DEFAULT_LABEL);
        return menuCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MenuCategory createUpdatedEntity(EntityManager em) {
        MenuCategory menuCategory = new MenuCategory()
            .label(UPDATED_LABEL);
        return menuCategory;
    }

    @BeforeEach
    public void initTest() {
        menuCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createMenuCategory() throws Exception {
        int databaseSizeBeforeCreate = menuCategoryRepository.findAll().size();

        // Create the MenuCategory
        MenuCategoryDTO menuCategoryDTO = menuCategoryMapper.toDto(menuCategory);
        restMenuCategoryMockMvc.perform(post("/api/menu-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(menuCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the MenuCategory in the database
        List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
        assertThat(menuCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        MenuCategory testMenuCategory = menuCategoryList.get(menuCategoryList.size() - 1);
        assertThat(testMenuCategory.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createMenuCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = menuCategoryRepository.findAll().size();

        // Create the MenuCategory with an existing ID
        menuCategory.setId(1L);
        MenuCategoryDTO menuCategoryDTO = menuCategoryMapper.toDto(menuCategory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMenuCategoryMockMvc.perform(post("/api/menu-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(menuCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MenuCategory in the database
        List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
        assertThat(menuCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMenuCategories() throws Exception {
        // Initialize the database
        menuCategoryRepository.saveAndFlush(menuCategory);

        // Get all the menuCategoryList
        restMenuCategoryMockMvc.perform(get("/api/menu-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(menuCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)));
    }
    
    @Test
    @Transactional
    public void getMenuCategory() throws Exception {
        // Initialize the database
        menuCategoryRepository.saveAndFlush(menuCategory);

        // Get the menuCategory
        restMenuCategoryMockMvc.perform(get("/api/menu-categories/{id}", menuCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(menuCategory.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL));
    }

    @Test
    @Transactional
    public void getNonExistingMenuCategory() throws Exception {
        // Get the menuCategory
        restMenuCategoryMockMvc.perform(get("/api/menu-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMenuCategory() throws Exception {
        // Initialize the database
        menuCategoryRepository.saveAndFlush(menuCategory);

        int databaseSizeBeforeUpdate = menuCategoryRepository.findAll().size();

        // Update the menuCategory
        MenuCategory updatedMenuCategory = menuCategoryRepository.findById(menuCategory.getId()).get();
        // Disconnect from session so that the updates on updatedMenuCategory are not directly saved in db
        em.detach(updatedMenuCategory);
        updatedMenuCategory
            .label(UPDATED_LABEL);
        MenuCategoryDTO menuCategoryDTO = menuCategoryMapper.toDto(updatedMenuCategory);

        restMenuCategoryMockMvc.perform(put("/api/menu-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(menuCategoryDTO)))
            .andExpect(status().isOk());

        // Validate the MenuCategory in the database
        List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
        assertThat(menuCategoryList).hasSize(databaseSizeBeforeUpdate);
        MenuCategory testMenuCategory = menuCategoryList.get(menuCategoryList.size() - 1);
        assertThat(testMenuCategory.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingMenuCategory() throws Exception {
        int databaseSizeBeforeUpdate = menuCategoryRepository.findAll().size();

        // Create the MenuCategory
        MenuCategoryDTO menuCategoryDTO = menuCategoryMapper.toDto(menuCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMenuCategoryMockMvc.perform(put("/api/menu-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(menuCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MenuCategory in the database
        List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
        assertThat(menuCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMenuCategory() throws Exception {
        // Initialize the database
        menuCategoryRepository.saveAndFlush(menuCategory);

        int databaseSizeBeforeDelete = menuCategoryRepository.findAll().size();

        // Delete the menuCategory
        restMenuCategoryMockMvc.perform(delete("/api/menu-categories/{id}", menuCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MenuCategory> menuCategoryList = menuCategoryRepository.findAll();
        assertThat(menuCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
