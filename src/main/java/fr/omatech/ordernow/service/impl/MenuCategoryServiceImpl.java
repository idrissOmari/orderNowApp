package fr.omatech.ordernow.service.impl;

import fr.omatech.ordernow.service.MenuCategoryService;
import fr.omatech.ordernow.domain.MenuCategory;
import fr.omatech.ordernow.repository.MenuCategoryRepository;
import fr.omatech.ordernow.service.dto.MenuCategoryDTO;
import fr.omatech.ordernow.service.mapper.MenuCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link MenuCategory}.
 */
@Service
@Transactional
public class MenuCategoryServiceImpl implements MenuCategoryService {

    private final Logger log = LoggerFactory.getLogger(MenuCategoryServiceImpl.class);

    private final MenuCategoryRepository menuCategoryRepository;

    private final MenuCategoryMapper menuCategoryMapper;

    public MenuCategoryServiceImpl(MenuCategoryRepository menuCategoryRepository, MenuCategoryMapper menuCategoryMapper) {
        this.menuCategoryRepository = menuCategoryRepository;
        this.menuCategoryMapper = menuCategoryMapper;
    }

    /**
     * Save a menuCategory.
     *
     * @param menuCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MenuCategoryDTO save(MenuCategoryDTO menuCategoryDTO) {
        log.debug("Request to save MenuCategory : {}", menuCategoryDTO);
        MenuCategory menuCategory = menuCategoryMapper.toEntity(menuCategoryDTO);
        menuCategory = menuCategoryRepository.save(menuCategory);
        return menuCategoryMapper.toDto(menuCategory);
    }

    /**
     * Get all the menuCategories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MenuCategoryDTO> findAll() {
        log.debug("Request to get all MenuCategories");
        return menuCategoryRepository.findAll().stream()
            .map(menuCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one menuCategory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MenuCategoryDTO> findOne(Long id) {
        log.debug("Request to get MenuCategory : {}", id);
        return menuCategoryRepository.findById(id)
            .map(menuCategoryMapper::toDto);
    }

    /**
     * Delete the menuCategory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MenuCategory : {}", id);
        menuCategoryRepository.deleteById(id);
    }
}
