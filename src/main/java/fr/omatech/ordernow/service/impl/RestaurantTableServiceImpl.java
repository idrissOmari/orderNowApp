package fr.omatech.ordernow.service.impl;

import fr.omatech.ordernow.service.RestaurantTableService;
import fr.omatech.ordernow.domain.RestaurantTable;
import fr.omatech.ordernow.repository.RestaurantTableRepository;
import fr.omatech.ordernow.service.dto.RestaurantTableDTO;
import fr.omatech.ordernow.service.mapper.RestaurantTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link RestaurantTable}.
 */
@Service
@Transactional
public class RestaurantTableServiceImpl implements RestaurantTableService {

    private final Logger log = LoggerFactory.getLogger(RestaurantTableServiceImpl.class);

    private final RestaurantTableRepository restaurantTableRepository;

    private final RestaurantTableMapper restaurantTableMapper;

    public RestaurantTableServiceImpl(RestaurantTableRepository restaurantTableRepository, RestaurantTableMapper restaurantTableMapper) {
        this.restaurantTableRepository = restaurantTableRepository;
        this.restaurantTableMapper = restaurantTableMapper;
    }

    /**
     * Save a restaurantTable.
     *
     * @param restaurantTableDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RestaurantTableDTO save(RestaurantTableDTO restaurantTableDTO) {
        log.debug("Request to save RestaurantTable : {}", restaurantTableDTO);
        RestaurantTable restaurantTable = restaurantTableMapper.toEntity(restaurantTableDTO);
        restaurantTable = restaurantTableRepository.save(restaurantTable);
        return restaurantTableMapper.toDto(restaurantTable);
    }

    /**
     * Get all the restaurantTables.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RestaurantTableDTO> findAll() {
        log.debug("Request to get all RestaurantTables");
        return restaurantTableRepository.findAll().stream()
            .map(restaurantTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one restaurantTable by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RestaurantTableDTO> findOne(Long id) {
        log.debug("Request to get RestaurantTable : {}", id);
        return restaurantTableRepository.findById(id)
            .map(restaurantTableMapper::toDto);
    }

    /**
     * Delete the restaurantTable by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RestaurantTable : {}", id);
        restaurantTableRepository.deleteById(id);
    }
}
